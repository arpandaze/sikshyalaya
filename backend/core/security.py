import binascii
import json
import os
import secrets
from hashlib import sha1

from fastapi import Request
from passlib.context import CryptContext
from starlette.exceptions import HTTPException
from starlette.status import HTTP_102_PROCESSING, HTTP_404_NOT_FOUND, HTTP_425_TOO_EARLY

from core.config import settings
from core.db import redis_session_client
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_sesssion_token(user: User, remember_me: bool, request: Request) -> str:
    session_token = secrets.token_hex(nbytes=16)
    expire_time = (
        settings.SESSION_EXPIRE_TIME_EXTENDED
        if remember_me
        else settings.SESSION_EXPIRE_TIME
    )

    active_sessions = await redis_session_client.client.get(
        f"user_{user.id}_sessions", encoding="utf-8"
    )

    if active_sessions:
        active_sessions = json.loads(active_sessions)
    else:
        active_sessions = {"uid": user.id, "sessions": []}

    active_sessions["sessions"].append(
        {
            "token": session_token,
            "ua": request.headers.get("user-agent"),
            "ip": request.client.host,
        }
    )

    data = {
        session_token: user.id,
        f"user_{user.id}_sessions": json.dumps(active_sessions),
    }

    await redis_session_client.client.mset(data)
    await redis_session_client.client.expire(session_token, expire_time)
    return session_token


async def create_2fa_temp_token(user: User, remember_me: bool) -> str:
    session_token = secrets.token_hex(nbytes=16)

    await redis_session_client.client.setex(
        f"two_fa_temp_{session_token}",
        settings.TWO_FA_TIMEOUT * 1000,
        json.dumps({"user": user.id, "remember_me": remember_me}),
    )

    return session_token


async def create_passwordless_create_token() -> str:
    token = secrets.token_hex(nbytes=16)

    await redis_session_client.client.setex(
        f"password_less_{token}",
        settings.PASSWORD_LESS_CREATE_TIMEOUT * 1000,
        "-1",
    )

    return token


async def authorize_passwordless_token(user: User, token: str) -> bool:
    value = await redis_session_client.client.get(
        f"password_less_{token}",
    )

    if value == None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                            detail="Invalid token!")
    elif int(value) == -1:
        await redis_session_client.client.setex(
            f"password_less_{token}",
            settings.PASSWORD_LESS_CREATE_TIMEOUT * 1000,
            user.id,
        )
        return True


async def verify_passwordless_token(token: str) -> int:
    value = (await redis_session_client.client.get(
        f"password_less_{token}",
    )).decode("UTF-8")

    if value == None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="Invalid token!"
        )

    elif value == "-1":
        raise HTTPException(
            status_code=HTTP_425_TOO_EARLY,
            detail="Waiting for authorization!"
        )
    else:
        await redis_session_client.client.delete(
            f"password_less_{token}",
        )
        return int(value)


async def create_2fa_enable_temp_token(user: User, totp_secret: str):
    await redis_session_client.client.setex(
        f"two_fa_enable_temp_{user.id}",
        settings.TWO_FA_TIMEOUT * 1000,
        totp_secret
    )
    return


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_uid_hash(uid: str) -> str:
    hasher = sha1()
    hasher.update(bytes(f"uid_{uid}", "utf-8"))
    return hasher.hexdigest()[3:10]
