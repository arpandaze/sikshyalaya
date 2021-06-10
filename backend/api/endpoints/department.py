from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_department
from schemas import Department, DepartmentUpdate
from models import User
from fastapi import HTTPException
from core import settings

router = APIRouter()

# get all Departments, can be called by all users (1 through 4)
@router.get("/", response_model=List[Department])
def get_department(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    department = crud_department.get_multi(db, skip=skip, limit=limit)
    return department


# create a new deparment, can be only created by admin and superadmin
@router.post("/", response_model=Department)
def create_department(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: DepartmentUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.user_type > settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=403, detail="Error ID: 104"
        )  # user has no authorization for creating departments
    else:
        department = crud_department.create(db, obj_in=obj_in)
        return department


# get a specific department, can be called by all user types (1 through 4)
@router.get("/{id}/", response_model=Department)
def get_specific_department(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    department = crud_department.get(db, id)
    return department


# update a specific department, can be called by only superadmin and admin
@router.put("/{id}/", response_model=Department)
def update_department(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: DepartmentUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.user_type > settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=403, detail="Error ID: 105"
        )  # user has no authorization for updating departments
    else:
        department = crud_department.get(db, id)
        crud_department.update(db, db_obj=department, obj_in=obj_in)
        return {"status": "success"}
