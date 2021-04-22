from datetime import timedelta
from typing import Any

from fastapi import (
    APIRouter,
    Body,
    Depends,
    HTTPException,
    Response,
    Form,
    status,
    Request,
)
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

import cruds
import models
import schemas

from utils import deps
from core import security
from core import throttle
from core.config import settings
from core.security import get_password_hash, create_sesssion_token
from utils.utils import (
    generate_password_reset_token,
    send_reset_password_email,
    verify_password_reset_token,
)
from google.oauth2 import id_token
from google.auth.transport import requests
from forms.login import LoginForm


router = APIRouter()


@router.post("/auth/app", response_model=schemas.Token)
async def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = cruds.crud_user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not cruds.crud_user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/auth/test-token", response_model=schemas.User)
async def test_token(current_user: models.User = Depends(deps.get_current_user)) -> Any:
    """
    Test access token
    """
    return current_user


# FIXME GET Request only for testing. Need to change to POST later!
@router.get("/auth/blacklist/{token}")
async def blacklist_token(token: str) -> Any:
    try:
        deps.blacklist_token(token)
        return Response(status_code=200)
    except Exception as e:
        raise e


@router.post("/auth/web", response_model=schemas.Token)
async def login_web_session(
    db: Session = Depends(deps.get_db), form_data: LoginForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    if not form_data.username:
        form_data.username = form_data.email

    user = cruds.crud_user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=401, detail="Inactive user")
    session_token = create_sesssion_token(user.id)
    response = JSONResponse({"status": "success"})
    response.set_cookie("session", session_token, httponly=True)
    return response


@router.get("/auth/web/test")
async def test_session_token(
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    return current_user.email


@router.post("auth/password-recovery/{email}", response_model=schemas.Msg)
async def recover_password(email: str, db: Session = Depends(deps.get_db)) -> Any:
    """
    Password Recovery
    """
    user = cruds.crud_user.get_by_email(db, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    send_reset_password_email(
        email_to=user.email, email=email, token=password_reset_token
    )
    return {"msg": "Password recovery email sent"}


@router.post("auth/reset-password/", response_model=schemas.Msg)
async def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Reset password
    """
    email = verify_password_reset_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = cruds.crud_user.get_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    elif not cruds.crud_user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    return {"msg": "Password updated successfully"}


@router.post("/social-auth/app/google")
async def google_app_social_auth(
    idtoken: str = Form(...), db: Session = Depends(deps.get_db)
):
    try:
        idinfo = id_token.verify_oauth2_token(
            idtoken, requests.Request(), settings.GOOGLE_CLIENT_ID
        )
        user_email = idinfo["email"]
        user_name = idinfo["name"]
        user = cruds.crud_user.get_by_email(db, email=user_email)

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token!"
        )

    if user:
        if user.auth_provider != settings.AuthProviders.GOOGLE.value:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Different authentication provider was used to register!",
            )
    else:
        user_info = schemas.user.UserCreate(
            email=user_email,
            password=settings.SECRET_KEY,
            is_active=True,
            is_superuser=False,
            full_name=user_name,
            auth_provider=settings.AuthProviders.GOOGLE.value,
        )
        user = cruds.crud_user.create(db, obj_in=user_info)

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/social-auth/web/google")
async def google_web_social_auth(
    db: Session = Depends(deps.get_db), idtoken: str = Form(...)
):
    try:
        idinfo = id_token.verify_oauth2_token(
            idtoken, requests.Request(), settings.GOOGLE_CLIENT_ID
        )
        user_email = idinfo["email"]
        user_name = idinfo["name"]
        user = cruds.crud_user.get_by_email(db, email=user_email)

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token!"
        )

    if user:
        if user.auth_provider != settings.AuthProviders.GOOGLE.value:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Different authentication provider was used to register!",
            )
    else:
        user_info = schemas.user.UserCreate(
            email=user_email,
            password=settings.SECRET_KEY,
            is_active=True,
            is_superuser=False,
            full_name=user_name,
            auth_provider=settings.AuthProviders.GOOGLE.value,
        )
        user = cruds.crud_user.create(db, obj_in=user_info)

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    session_token = create_sesssion_token(user.id)
    response = Response()
    response.set_cookie("session", session_token, httponly=True)
    return response


@router.get("/thtest1")
@throttle.ip_throttle(rate=10, per=60)
async def throttle_test(
    request: Request,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    return "Throttle test endpoint 1 Hello"


@router.get("/thtest2")
@throttle.user_throttle(rate=20, per=60)
async def throttle_test1(
    request: Request,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    return "Throttle test endpoint 2"
