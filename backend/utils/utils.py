import binascii
import logging
import os
from pathlib import Path
from typing import Any, Dict, Optional
import json

import emails
from emails.template import JinjaTemplate
from fastapi import HTTPException, status

from core.config import settings
from core.db import redis_session_client
from models import User
from cruds import crud_user
from core.db import SessionLocal


def send_email(
    email_to: str,
    subject_template: str = "",
    html_template: str = "",
    environment: Dict[str, Any] = {},
) -> None:
    assert settings.EMAILS_ENABLED, "no provided configuration for email variables"
    message = emails.Message(
        subject=JinjaTemplate(subject_template),
        html=JinjaTemplate(html_template),
        mail_from=(settings.EMAILS_FROM_NAME, settings.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": settings.SMTP_HOST, "port": settings.SMTP_PORT}
    if settings.SMTP_TLS:
        smtp_options["tls"] = True
    if settings.SMTP_USER:
        smtp_options["user"] = settings.SMTP_USER
    if settings.SMTP_PASSWORD:
        smtp_options["password"] = settings.SMTP_PASSWORD

    response = message.send(to=email_to, render=environment, smtp=smtp_options)

    print(response)
    logging.info(f"send email result: {response}")


def send_test_email(email_to: str) -> None:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Test email"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "test_email.html") as f:
        template_str = f.read()
    send_email(
        email_to=email_to,
        subject_template=subject,
        html_template=template_str,
        environment={
            "project_name": settings.PROJECT_NAME,
            "email": email_to,
            "frontbase": settings.FRONTEND_URL_BASE,
        },
    )


async def send_reset_password_email(user: User) -> None:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Password Recovery"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "reset-password.html") as f:
        template_str = f.read()

    server_host = settings.FRONTEND_URL_BASE

    reset_token = await generate_password_reset_token(uid=user.id)
    link = f"{server_host}/reset?token={reset_token}"
    send_email(
        email_to=user.email,
        subject_template=subject,
        html_template=template_str,
        environment={
            "project_name": settings.PROJECT_NAME,
            "username": user.email,
            "name": user.full_name,
            "email": user.email,
            "frontbase": settings.FRONTEND_URL_BASE,
            "valid_hours": settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS,
            "link": link,
        },
    )


async def send_verification_email(user: User) -> None:
    project_name = settings.PROJECT_NAME
    subject = f"{project_name} - Verification Email"
    with open(Path(settings.EMAIL_TEMPLATES_DIR) / "verify-account.html") as f:
        template_str = f.read()
    verification_token = await generate_verify_token(user.id)

    server_host = settings.FRONTEND_URL_BASE

    link = f"{server_host}/verify?token={verification_token}"
    send_email(
        email_to=user.email,
        subject_template=subject,
        html_template=template_str,
        environment={
            "name": user.full_name,
            "link": link,
            "frontbase": settings.FRONTEND_URL_BASE,
        },
    )


async def generate_password_reset_token(uid: str) -> str:
    reset_token = binascii.hexlify(os.urandom(20)).decode()
    await redis_session_client.client.set(f"pwr_token_{reset_token}", uid)
    await redis_session_client.client.expire(
        f"pwr_token_{reset_token}",
        settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS * 60 * 60 * 1000,
    )
    return reset_token


async def generate_verify_token(uid: str) -> str:
    verify_token = binascii.hexlify(os.urandom(20)).decode()
    await redis_session_client.client.set(f"verify_token_{verify_token}", uid)
    await redis_session_client.client.expire(
        f"verify_token_{verify_token}",
        settings.EMAIL_VERIFY_EXPIRE_HOURS * 60 * 60 * 1000,
    )
    return verify_token


async def verify_password_reset_token(token: str) -> Optional[int]:
    uid = await redis_session_client.client.get(f"pwr_token_{token}", encoding="utf-8")
    if not uid:
        raise HTTPException(
            status_code=401, detail="Token has expired!"
        )  # Invalid token
    await redis_session_client.client.expire(f"pwr_token_{token}", timeout=0)
    return int(uid)


async def verify_user_verify_token(token: str) -> Optional[int]:
    uid = await redis_session_client.client.get(
        f"verify_token_{token}", encoding="utf-8"
    )
    if not uid:
        raise HTTPException(
            status_code=401, detail="Token has expired!"
        )  # Invalid token
    await redis_session_client.client.expire(f"verify_token_{token}", timeout=0)
    return int(uid)


async def expire_web_session(token: str) -> Any:
    user_id = await redis_session_client.client.get(token, encoding="utf-8")
    active_sessions = await redis_session_client.client.get(
        f"user_{user_id}_sessions", encoding="utf-8"
    )

    if active_sessions:
        active_sessions = json.loads(active_sessions)
        new_active_sessions = [
            item for item in active_sessions["sessions"] if item["token"] != token
        ]

        active_sessions["sessions"] = new_active_sessions

        data = {f"user_{user_id}_sessions": json.dumps(active_sessions)}
        await redis_session_client.client.mset(data)

    return await redis_session_client.client.expire(token, 0)


def get_super_admin() -> User:
    return crud_user.get_by_id(db=SessionLocal(), id=1)
