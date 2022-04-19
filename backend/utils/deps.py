from typing import Generator
from typing import Optional

from fastapi import Cookie
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

import cruds
import models
from core import settings
from core.db import SessionLocal
from core.db import redis_session_client


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


async def get_current_user(
    db: Session = Depends(get_db),
    session: str = Cookie(None),
) -> models.User:
    if not session:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Error ID: 137"
        )  # Invalid Session Token!

    user_id = await redis_session_client.client.get(session, encoding="utf-8")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Error ID: 138"
        )  # Invalid Session Token!
    user = cruds.crud_user.get(db, id=user_id)

    if not user:
        raise HTTPException(status_code=404, detail="Error ID: 139")  # User not found
    return user


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not cruds.crud_user.is_active(current_user):
        raise HTTPException(status_code=400, detail="Error ID: 140")  # Inactive user
    return current_user

def get_current_active_ws_users(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not cruds.crud_user.is_active(current_user):
        raise HTTPException(status_code=400, detail="Error ID: 140")  # Inactive user
    return current_user

async def auth_token(token: Optional[str] = None):
    if token:
        return {"token": token}
    else:
        return None

async def get_current_active_ws_user(
    db: Session = Depends(get_db),
    params: dict = Depends(auth_token),
    session: str = Cookie(None),
) -> models.User:
    if not (session or params):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Error ID: 137"
        )  # Invalid Session Token!

    if session:
        session_token = session
    else:
        session_token = params.get("token")

    user_id = await redis_session_client.client.get(session_token, encoding="utf-8")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Error ID: 138"
        )  # Invalid Session Token!
    user = cruds.crud_user.get(db, id=user_id)

    if not user:
        raise HTTPException(status_code=404, detail="Error ID: 139")  # User not found
    return user


def get_current_active_teacher(
    current_user: models.User = Depends(get_current_active_user),
) -> models.User:
    if current_user.user_type == settings.UserType.TEACHER.value:
        return current_user
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


def get_current_active_teacher_or_above(
    current_user: models.User = Depends(get_current_active_user),
) -> models.User:
    if current_user.user_type <= settings.UserType.TEACHER.value:
        return current_user
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


def get_current_active_superuser(
    current_user: models.User = Depends(get_current_active_user),
) -> models.User:
    if not cruds.crud_user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="Error ID: 141"
        )  # The user doesn't have enough privileges
    return current_user


def get_current_admin_or_above(
    current_user: models.User = Depends(get_current_active_user),
) -> models.User:
    if not current_user.user_type <= settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=400, detail="Error ID: 142"
        )  # The user doesn't have enough privileges
    return current_user
