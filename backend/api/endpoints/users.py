from schemas.user import UserCreate
from typing import Any, List
import aiofiles
from hashlib import sha1

import os

from fastapi import APIRouter, Body, Depends, HTTPException, UploadFile, File
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session
from core import settings


import cruds
import models
import schemas
from utils import deps
from core.config import settings
from utils.utils import send_verification_email

router = APIRouter()


# @router.get("/", response_model=List[schemas.User])
# def read_users(
#         db: Session = Depends(deps.get_db),
#         skip: int = 0,
#         limit: int = 100,
#         current_user: models.User = Depends(deps.get_current_active_superuser),
# ) -> Any:
#     """
#     Retrieve users.
#     """
#     users = cruds.crud_user.get_multi(db, skip=skip, limit=limit)
#     return users


@router.get("/", response_model=schemas.User)
async def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    # current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve users.
    """
    users = cruds.crud_user.get_by_email_test(db, email="test@test.com")
    return users


@router.post("/", response_model=schemas.User)
async def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    user = cruds.crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Error ID: 128",
        )  # The user with this username already exists in the system.
    user = cruds.crud_user.create(db, obj_in=user_in)
    await send_verification_email(email_to=user_in.email, user=user)
    return user


@router.put("/me", response_model=schemas.user.UserReturn)
async def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    new_data: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own user.
    """
    current_user_data = jsonable_encoder(current_user)
    current_user_data.update(jsonable_encoder(new_data))
    user_in = schemas.UserUpdate(**current_user_data)
    user = cruds.crud_user.update(db, db_obj=current_user, obj_in=user_in)
    return user


@router.get("/me", response_model=schemas.user.UserReturn)
async def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.put("/me/profile")
async def update_my_profile_photo(
    db: Session = Depends(deps.get_db),
    *,
    current_user: models.User = Depends(deps.get_current_active_user),
    profile_photo: UploadFile = File(...),
):

    content_type = profile_photo.content_type
    file_extension = content_type[content_type.index("/") + 1 :]
    profile_image_path = os.path.join(settings.UPLOAD_DIR_ROOT, "profiles")
    hasher = sha1()
    hasher.update(bytes(str(current_user.id), "utf-8"))
    profile_image = f"{hasher.hexdigest()}.{file_extension}"
    profile_image_file_path = os.path.join(profile_image_path, profile_image)

    if not os.path.exists(profile_image_path):
        os.makedirs(profile_image_path)

    async with aiofiles.open(profile_image_file_path, mode="wb") as f:
        content = await profile_photo.read()
        await f.write(content)

    user = cruds.crud_user.update(
        db,
        db_obj=current_user,
        obj_in=schemas.user.ImageUpdate(profile_image=profile_image),
    )

    return {"msg": "success", "profile": profile_image}


@router.get("/{user_id}", response_model=schemas.User)
async def read_user_by_id(
    user_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get a specific user by id.
    """
    user = cruds.crud_user.get(db, id=user_id)
    if user == current_user:
        return user
    if not cruds.crud_user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="Error ID: 131"
        )  # The user doesn't have enough privileges
    return user


@router.put("/{user_id}", response_model=schemas.User)
async def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a user.
    """
    user = cruds.crud_user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Error ID: 132",
        )  # The user with this username does not exist in the system
    user = cruds.crud_user.update(db, db_obj=user, obj_in=user_in)
    return user


@router.put("/{user_id}/profile")
async def update_profile_photo(
    db: Session = Depends(deps.get_db),
    *,
    user_id: int,
    current_user: models.User = Depends(deps.get_current_admin_or_above),
    profile_photo: UploadFile = File(...),
):

    user = cruds.crud_user.get_by_id(db, id=user_id)
    profile_image_path = os.path.join("uploaded_files", "profiles")
    profile_image = f"{abs(hash(str(user.id)))}.jpg"
    profile_image_file_path = os.path.join(profile_image_path, profile_image)

    if not os.path.exists(profile_image_path):
        os.makedirs(profile_image_path)
    else:
        if os.path.exists(os.path.join(profile_image_path, f"{user.profile_image}")):
            os.remove(os.path.join(profile_image_path, f"{user.profile_image}"))

    async with aiofiles.open(profile_image_file_path, mode="wb") as f:
        content = await profile_photo.read()
        await f.write(content)

    user = cruds.crud_user.update(
        db,
        db_obj=user,
        obj_in=schemas.UserUpdate(profile_image=profile_image),
    )

    return user
