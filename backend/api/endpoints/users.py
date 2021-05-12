from schemas.user import UserCreate
from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

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
    user_in: schemas.UserSignUp,
    # current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new user.
    """
    user = cruds.crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Error ID: 128",
        )  # The user with this username already exists in the system.
    user = cruds.crud_user.create(db, obj_in=UserCreate(**user_in.dict()))
    await send_verification_email(email_to=user_in.email, user=user)

    return user


@router.put("/me", response_model=schemas.User)
async def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(None),
    full_name: str = Body(None),
    email: EmailStr = Body(None),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own user.
    """
    current_user_data = jsonable_encoder(current_user)
    user_in = schemas.UserUpdate(**current_user_data)
    if password is not None:
        user_in.password = password
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email
    user = cruds.crud_user.update(db, db_obj=current_user, obj_in=user_in)
    return user


@router.get("/me", response_model=schemas.User)
async def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.post("/open", response_model=schemas.User)
async def create_user_open(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(...),
    email: EmailStr = Body(...),
    full_name: str = Body(None),
) -> Any:
    """
    Create new user without the need to be logged in.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail="Error ID: 129",
        )  # Open user registration is forbidden on this server
    user = cruds.crud_user.get_by_email(db, email=email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Error ID: 130",
        )  # The user with this username already exists in the system
    user_in = schemas.UserCreate(password=password, email=email, full_name=full_name)
    user = cruds.crud_user.create(db, obj_in=user_in)
    return user


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
