import binascii
import json
import os
import secrets
from hashlib import sha1

from fastapi import Request
from passlib.context import CryptContext

from core.config import settings
from core.db import redis_session_client
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_sesssion_token(user: User, request: Request, remember_me: bool) -> str:
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


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_uid_hash(uid: str) -> str:
    hasher = sha1()
    hasher.update(bytes(f"uid_{uid}", "utf-8"))
    return hasher.hexdigest()[3:10]
