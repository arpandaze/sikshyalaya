import json
import os
from typing import Any, List, Optional

import aiofiles
from fastapi import APIRouter, Body
from fastapi import Cookie as ReqCookie
from fastapi import Depends, File, HTTPException, Request, UploadFile
from fastapi.params import Cookie
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import update
from sqlalchemy.sql.functions import current_user
from starlette.responses import JSONResponse, Response

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
    create_2fa_enable_temp_token
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
import pyotp
from cruds import crud_user


router = APIRouter()


@router.get("/enable/request")
async def two_fa_enable_request(
    db: Session = Depends(deps.get_db),
    *,
    current_user: models.User = Depends(deps.get_current_user),
    request: Request,
    response: Response,
) -> Any:
    if current_user.two_fa_secret != None:
        raise HTTPException(
            status_code=409, detail="2FA is already enabled!"
        )

    totp_secret = pyotp.random_base32()
    await create_2fa_enable_temp_token(current_user, totp_secret)

    totp_url = pyotp.totp.TOTP(totp_secret).provisioning_uri(
        name=current_user.email,
        issuer_name=settings.PROJECT_NAME
    )

    return {"msg": "2FA enable requested!", "uri": totp_url, "secret": totp_secret}


@router.post("/enable/confirm")
async def two_fa_enable_confirm(
    db: Session = Depends(deps.get_db),
    *,
    form_data: schemas.Two_FA_Confirm,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    totp_secret = await redis_session_client.client.get(
        f"two_fa_enable_temp_{current_user.id}"
    )
    totp_secret = totp_secret.decode("utf-8")
    if not totp_secret:
        raise HTTPException(
            status_code=403, detail="Invalid or expired TOTP"
        )

    totp = pyotp.TOTP(totp_secret)
    totp_valid = totp.verify(str(form_data.totp), valid_window=1)

    if totp_valid:
        crud_user.enable_2fa(db, secret=totp_secret, db_obj=current_user)
        await redis_session_client.client.delete(
            f"two_fa_enable_temp_{current_user.id}"
        )
        return {"msg": "2FA successfully enabled!"}
    else:
        return {"msg": "Invalid TOTP!"}


@router.post("/login/confirm", response_model=Optional[schemas.user.UserLoginReturn], response_model_exclude_none=True)
async def two_fa_login_confirm(
    db: Session = Depends(deps.get_db),
    *,
    form_data: schemas.Two_FA_Confirm,
    request: Request,
    response: Response
) -> Any:
    token = request.cookies.get("temp_session")

    if token == None:
        raise HTTPException(
            status_code=403, detail="Invalid token!"
        )

    data = json.loads(await redis_session_client.client.get(
        f"two_fa_temp_{token}",
    ))
    # json.dumps({"user": user.id, "remember_me": remember_me}),

    user = crud_user.get(db, id=data.get("user"))

    totp = pyotp.TOTP(user.two_fa_secret)
    totp_valid = totp.verify(str(form_data.totp), valid_window=1)

    if not totp_valid:
        raise HTTPException(
            status_code=403, detail="Invalid TOTP!"
        )

    session_token = await create_sesssion_token(user, data.get("remember_me"), request)

    response.delete_cookie("temp_session")
    response.set_cookie("session", session_token, httponly=True)

    await redis_session_client.client.delete(f"two_fa_temp_{token}")
    return {"msg": "Logged in successfully!", "user": user, "two_fa_required": None}


@router.delete(
    "/disable",
)
async def two_fa_disable(
    db: Session = Depends(deps.get_db),
    *,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    if current_user.two_fa_secret == None:
        raise HTTPException(
            status_code=409, detail="2FA is already disabled!"
        )
    crud_user.disable_2fa(db, db_obj=current_user)

    return {"msg": "2FA successfully disabled!"}
