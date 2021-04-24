from typing import Any, Optional
from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

import cruds
import models
import schemas
from core import security
from core import settings
from core.db import SessionLocal
from core.db import redis_blacklist_client
from core.db import redis_session_client
from asyncio import run
from fastapi import Cookie

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


async def get_current_user(
    db: Session = Depends(get_db),
    session: Optional[str] = Cookie(None),
) -> models.User:
    try:
        user_id = await redis_session_client.client.get(session, encoding="utf-8")
        print(user_id)
        assert user_id != "", "Invalid Session Token"
        user = cruds.crud_user.get(db, id=user_id)

    except AssertionError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Session Token!"
        )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not cruds.crud_user.is_active(current_user):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_active_teacher(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if current_user.user_type == settings.UserType.TEACHER:
        return current_user
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


def get_current_active_superuser(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not cruds.crud_user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user
