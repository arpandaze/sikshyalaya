import binascii
import secrets
import os
from hashlib import sha1

from passlib.context import CryptContext

from core.config import settings
from core.db import redis_session_client
from models import User
import json


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_sesssion_token(user: User, remember_me: bool) -> str:
    session_token = secrets.token_hex(nbytes=16)
    expire_time = (
        settings.SESSION_EXPIRE_TIME_EXTENDED
        if remember_me
        else settings.SESSION_EXPIRE_TIME
    )
    data = {
        session_token: user.id,
    }
    await redis_session_client.client.mset(data)
    await redis_session_client.client.expire(f"sess_{session_token}", expire_time)
    await redis_session_client.client.expire(f"{user.id}_permissions", expire_time)
    return session_token


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_uid_hash(uid: str) -> str:
    hasher = sha1()
    hasher.update(bytes(f"uid_{uid}", "utf-8"))
    return hasher.hexdigest()[3:10]
