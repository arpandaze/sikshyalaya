from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.core import security
from app.core.config import settings
from app.db.session import SessionLocal
from app.db.redis_session import redis_blacklist_client
from app.db.redis_session import redis_session_client
from typing import Any, Optional



reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), token: Optional[str] = Depends(reusable_oauth2), session: Optional[str] = None
) -> models.User:
    if len(token) != 40:
        if(redis_blacklist_client.get(token) != None):
            raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account blocked. Contact support!",
        )
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
            )
            token_data = schemas.TokenPayload(**payload)
        except (jwt.JWTError, ValidationError):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
            )
        user = crud.user.get(db, id=token_data.sub)

    else:
        try:
            user_id = redis_session_client.get(token).encode("utf-8")
            assert user_id != "", "Invalid Session Token"
            user = crud.user.get(db, id=user_id)

        except AssertionError:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Session Token!")

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_active(current_user):
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
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user

def blacklist_token(token: str = Depends(reusable_oauth2)) -> Any:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        redis_blacklist_client.set(token, 1)
        redis_blacklist_client.expireat(token, payload.get("exp"))
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
