import binascii
import os

from passlib.context import CryptContext

from core.config import settings
from core.db import redis_session_client
from models import User
import json


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_sesssion_token(user: User, remember_me: bool) -> str:
    session_token = binascii.hexlify(os.urandom(20)).decode()
    expire_time = (
        settings.SESSION_EXPIRE_TIME_EXTENDED
        if remember_me
        else settings.SESSION_EXPIRE_TIME
    )
    data = {
        session_token: user.id,
    }
    await redis_session_client.client.mset(data)
    await redis_session_client.client.expire(session_token, expire_time)
    await redis_session_client.client.expire(f"{user.id}_permissions", expire_time)
    return session_token


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_uid_hash(uid: str) -> str:
    return str(hash(f"uid_{id}"))[1:7]
