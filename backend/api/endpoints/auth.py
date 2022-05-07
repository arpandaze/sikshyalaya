import json
import os
from typing import Any, List, Optional

import aiofiles
from fastapi import APIRouter, Body
from fastapi import Cookie as ReqCookie
from fastapi import Depends, File, HTTPException, Request, UploadFile, Form
from fastapi.params import Cookie
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import update
from sqlalchemy.sql.functions import current_user
from starlette.responses import JSONResponse, Response
from starlette.status import HTTP_401_UNAUTHORIZED

import cruds
import models
import schemas
from core import throttle
from core.config import settings
from core.db import redis_session_client
from core.security import (
    create_sesssion_token,
    get_password_hash,
    create_2fa_temp_token,
    create_passwordless_create_token,
    authorize_passwordless_token,
    verify_passwordless_token,
)
from cruds import group
from schemas.user import UserUpdate, VerifyUser
from utils import deps
from utils.utils import (
    expire_web_session,
    generate_password_reset_token,
    send_reset_password_email,
    send_verification_email,
    verify_password_reset_token,
    verify_user_verify_token,
)

router = APIRouter()


@router.post(
    "/web/",
    response_model=Optional[schemas.user.UserLoginReturn],
    response_model_exclude_none=True,
)
async def login_web_session(
    db: Session = Depends(deps.get_db),
    *,
    form_data: schemas.LoginData,
    request: Request,
    response: Response,
) -> Any:
    if not form_data.username:
        form_data.username = form_data.email

    user = cruds.crud_user.authenticate(
        db, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=401, detail="Error ID: 111"
        )  # Incorrect email or password
    elif not user.is_active:
        raise HTTPException(
            status_code=401, detail="Error ID: 112")  # Inactive user

    if user.two_fa_secret:
        temp_token = await create_2fa_temp_token(user, form_data.remember_me)
        response.set_cookie("temp_session", temp_token, httponly=True)
        return {
            "msg": "2FA required before proceeding!",
            "two_fa_required": True,
            "user": None,
        }
    else:
        session_token = await create_sesssion_token(
            user, form_data.remember_me, request
        )
        response.set_cookie("session", session_token, httponly=True)
        return {
            "msg": "Logged in successfully!",
            "user": user,
            "two_fa_required": False,
        }


@router.get("/password-less/create")
async def generate_passwordless_login_token(
    db: Session = Depends(deps.get_db),
):
    token = await create_passwordless_create_token()

    return {"token": token}


@router.post("/password-less/authorize")
async def authorize_passwordless_login(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
    token: str = Form(None),
):
    _ = await authorize_passwordless_token(current_user, token)

    return {"msg": "Success"}


@router.post(
    "/password-less/verify",
    response_model=Optional[schemas.user.UserLoginReturn],
    response_model_exclude_none=True,
)
async def verify_passwordless_login(
    response: Response,
    request: Request,
    db: Session = Depends(deps.get_db),
    token: str = Form(None),
):
    user_id = await verify_passwordless_token(token)

    user = cruds.crud_user.get_by_id(db, id=user_id)

    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Invalid user!")

    session_token = await create_sesssion_token(user, True, request)
    response.set_cookie("session", session_token, httponly=True)
    return {"msg": "Logged in successfully!", "user": user, "two_fa_required": False}


@router.post("/signup/", response_model=schemas.Msg)
async def sign_up(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserSignUp,
) -> Any:
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Error ID: 129",
        )  # Open user registration is forbidden on this server
    user = cruds.crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Email is associated with another user!",
        )  # The user with this username already exists in the system
    email_host = user_in.email[user_in.email.index("@") + 1:]

    if email_host not in settings.ALLOWED_EMAIL_HOST:
        raise HTTPException(
            status_code=403,
            # TODO: Reflected XSS test
            detail=f"Email of host {email_host} not allowed!",
        )

    user = cruds.crud_user.create(
        db, obj_in=schemas.UserCreate(**user_in.dict(), profile_pic="")
    )
    await send_verification_email(user=user)
    return schemas.Msg(msg="Success")


@router.post("/resend-verification-email/")
async def resend_verification_email(
    email: str,
    current_user: models.User = Depends(deps.get_current_admin_or_above),
    db: Session = Depends(deps.get_db),
):
    user = cruds.crud_user.get_by_email(db=db, email=email)
    if not user:
        raise HTTPException(status_code="404", detail="User doesn't exist")

    await send_verification_email(user)
    return schemas.Msg(msg="Success")


@router.post("/change-password/")
async def change_password(
    current_password: str = Body(...),
    new_password: str = Body(...),
    current_user: models.User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
) -> Any:
    user = cruds.crud_user.authenticate(
        db, email=current_user.email, password=current_password
    )

    if not user:
        raise HTTPException(
            status_code=403, detail="Error ID: 111"
        )  # Incorrect email or password

    data = schemas.user.PasswordUpdate(
        password=new_password,
    )

    cruds.crud_user.update(db=db, db_obj=current_user, obj_in=data)


@router.get("/active-sessions/", response_model=List[schemas.auth.ActiveSession])
async def get_active_sessions(
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    active_sessions = json.loads(
        await redis_session_client.client.get(
            f"user_{current_user.id}_sessions", encoding="utf-8"
        )
    )
    return active_sessions.get("sessions")


@router.get("/logout-all-sessions/")
async def logout_all_sessions(
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    active_sessions = json.loads(
        await redis_session_client.client.get(
            f"user_{current_user.id}_sessions", encoding="utf-8"
        )
    )

    for session in active_sessions.get("sessions"):
        await redis_session_client.client.expire(session.get("token"), 0)

    await redis_session_client.client.expire(f"user_{current_user.id}_sessions", 0)

    resp = JSONResponse({"status": "success"})
    resp.delete_cookie("session")
    return resp


@router.post("/password-recovery/", response_model=schemas.Msg)
# @throttle.ip_throttle(rate=3, per=1 * 60 * 60)
# @throttle.ip_throttle(rate=1, per=20)
async def recover_password(
    request: Request,
    email: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Password Recovery
    """
    user = cruds.crud_user.get_by_email(db, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Error ID: 113",
        )  # The user with this username does not exist in the system.
    await send_reset_password_email(user=user)
    return {"msg": "Password recovery email sent"}


@router.post("/reset-password/", response_model=schemas.Msg)
async def reset_password(
    request: Request,
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Reset password
    """
    uid = await verify_password_reset_token(token)
    user = cruds.crud_user.get_by_id(db, id=uid)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Error ID: 114",
        )  # The user with this username does not exist in the system.
    elif not cruds.crud_user.is_active(user):
        raise HTTPException(
            status_code=400, detail="Error ID: 115")  # Inactive user
    hashed_password = get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    return {"msg": "Password updated successfully"}


@router.post("/verify/", response_model=schemas.Msg)
async def verify_account(
    token: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    uid = await verify_user_verify_token(token)
    user = cruds.crud_user.get_by_id(db, id=uid)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Error ID: 146",
        )  # The user with this username does not exist in the system.
    cruds.crud_user.verify_user(db=db, db_obj=user)
    return {"msg": "Verified successfully"}


@router.get("/logout/", response_model=schemas.Token)
async def session_logout(
    session: str = ReqCookie(None),
) -> Any:
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session token!")
    await expire_web_session(session)
    resp = JSONResponse({"status": "success"})
    resp.delete_cookie("session")
    return resp


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
