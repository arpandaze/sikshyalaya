from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_user_permission
from app.schemas.user_permission import (
    UserPermission,
    UserPermissionCreate,
    UserPermissionUpdate,
)

router = APIRouter()


@router.get("/userpermission", response_model=List[UserPermission])
def get_user_permission(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    user_permission = crud_user_permission.get_multi(db, skip=skip, limit=limit)
    return user_permission


@router.post("/userpermission", response_model=UserPermission)
def create_user_permission(
    db: Session = Depends(deps.get_db), *, obj_in: UserPermissionCreate
) -> Any:
    user_permission = crud_user_permission.create(db, obj_in=obj_in)
    return user_permission


@router.get("/userpermission/{id}", response_model=UserPermission)
def get_specific_user_permission(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    user_permission = crud_user_permission.get(db, id)
    return user_permission


@router.put("/userpermission/{id}", response_model=UserPermission)
def update_user_permission(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: UserPermissionUpdate
) -> Any:
    user_permission = crud_user_permission.get(db, id)
    user_permission = crud_user_permission.update(
        db, db_obj=user_permission, obj_in=obj_in
    )
    return user_permission
