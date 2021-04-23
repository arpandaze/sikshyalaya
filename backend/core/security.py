import binascii
import os
from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from core.config import settings
from core.db import redis_session_client
from models import User

# from redis import Redis

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


def create_access_token(
        subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def create_sesssion_token(user: User) -> str:
    session_token = binascii.hexlify(os.urandom(20)).decode()
    await redis_session_client.client.set(session_token, user.id, expire=settings.SESSION_EXPIRE_MINUTES * 60)
    return session_token


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
