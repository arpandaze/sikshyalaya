import secrets
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
from utils.utils import send_reset_password_email

from fastapi import FastAPI, File, Form, UploadFile
from typing import List, Optional
from datetime import date

router = APIRouter()


@router.get("/", response_model=List[schemas.user.UserReturn])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_admin_or_above),
) -> Any:
    """
    Retrieve users.
    """
    users = cruds.crud_user.get_multi(db, skip=skip, limit=limit)
    return users


@router.get("/teacher/", response_model=List[schemas.user.TeacherShort])
def get_teachers(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 200,
    current_user: models.User = Depends(deps.get_current_active_teacher_or_above),
) -> Any:
    teachers = (
        db.query(models.User)
        .filter(models.User.user_type == settings.UserType.TEACHER.value)
        .all()
    )
    return teachers


@router.post("/", response_model=schemas.User)
async def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.user.AdminUserCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    user = cruds.crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Error ID: 128",
        )  # The user with this username already exists in the system.
    user_create = schemas.UserCreate(
        email=user_in.email,
        full_name=user_in.full_name,
        address=user_in.address,
        group_id=user_in.group_id,
        contact_number=user_in.contact_number,
        dob=user_in.dob,
        join_year=user_in.join_year,
        password=settings.SECRET_KEY,
    )
    user = cruds.crud_user.create(db, obj_in=user_create)
    cruds.crud_user.verify_user(db=db, db_obj=user)
    await send_reset_password_email(user=user)
    return user


@router.put("/me/", response_model=schemas.user.UserReturn)
async def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    full_name: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    dob: Optional[date] = Form(None),
    contact_number: Optional[str] = Form(None),
    profile_photo: Optional[UploadFile] = File(None),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own user.
    """
    profile_db_path = None
    if profile_photo:
        profiles_path = os.path.join(settings.UPLOAD_DIR_ROOT, "profiles")
        content_type = profile_photo.content_type
        file_extension = content_type[content_type.index("/") + 1 :]
        new_profile_image = f"{secrets.token_hex(nbytes=16)}.{file_extension}"
        profile_db_path = os.path.join("profiles", new_profile_image)
        new_profile_image_file_path = os.path.join(
            settings.UPLOAD_DIR_ROOT, profile_db_path
        )

        if not os.path.exists(profiles_path):
            os.makedirs(profiles_path)

        async with aiofiles.open(new_profile_image_file_path, mode="wb") as f:
            content = await profile_photo.read()
            await f.write(content)

        try:
            if current_user.profile_image != None:
                os.remove(
                    os.path.join(settings.UPLOAD_DIR_ROOT, current_user.profile_image)
                )
        except Exception:
            pass

    user_in = schemas.UserUpdate(
        full_name=full_name,
        address=address,
        dob=dob,
        contact_number=contact_number,
        profile_image=profile_db_path,
    )
    print(jsonable_encoder(user_in))

    user = cruds.crud_user.update(
        db, db_obj=current_user, obj_in=user_in.dict(exclude_none=True)
    )

    return user


@router.get(
    "/me/", response_model=schemas.user.UserReturn, response_model_exclude_none=True
)
# @router.get("/me/teacher_group", response_model=schemas.user.UserReturn)
async def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


# @router.put("/me/profile/")
# async def update_my_profile_photo(
# db: Session = Depends(deps.get_db),
# *,
# current_user: models.User = Depends(deps.get_current_active_user),
# profile_photo: UploadFile = File(...),
# ):

# cruds.crud_user.update(
# db,
# db_obj=current_user,
# obj_in=schemas.user.ImageUpdate(profile_image=profile_db_path),
# )

# return {"msg": "success", "profile": new_profile_image}


@router.get("/{user_id}/", response_model=schemas.user.UserReturn)
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

    if current_user.user_type > settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=400, detail="Error ID: 131"
        )  # The user doesn't have enough privileges
    # if not cruds.crud_user.is_superuser(current_user):
    #     raise HTTPException(
    #         status_code=400, detail="Error ID: 131"
    #     )  # The user doesn't have enough privileges
    return user


@router.put("/{user_id}/", response_model=schemas.User)
async def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_admin_or_above),
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


@router.delete("/{user_id}/")
async def delete_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    current_user: models.User = Depends(deps.get_current_admin_or_above),
) -> Any:
    cruds.crud_user.remove(db, id=user_id)
    return {"msg": "success"}


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
