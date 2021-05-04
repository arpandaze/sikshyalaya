from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_group, crud_department, crud_course
from schemas import Group, GroupUpdate
from models import User
from core import settings
from fastapi import HTTPException

router = APIRouter()

# get group:
# can be called by student to get their group,
# can be called by teacher to get the group under their depart
# can be called by admin and super admin to get all the departs
@router.get("/", response_model=List[Group])
def get_group(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.user_type == settings.UserType.STUDENT.value:
        group = crud_group.get(db, current_user.group_id)
        return group

    # FIXME: schema sanga milaunu parcha
    if current_user.user_type == settings.UserType.TEACHER.value:
        return current_user.teacher_group

    if current_user.user_type <= settings.UserType.ADMIN.value:
        group = crud_group.get_multi(db, skip=skip, limit=limit)
        return group


# create new group, can be done by only admin and super admin
@router.post("/", response_model=Group)
def create_group(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: GroupUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    if current_user.user_type >= settings.UserType.TEACHER.value:
        raise HTTPException(
            status_code=401,
            detail="Error ID: 106",  # user has no authorization for creating groups
        )
    else:
        crud_group.create(db, obj_in=obj_in)
        return {"status": "success"}


# get a specific group by id
# student: cannot get by id, can get their own group by directly calling "/"
# teacher: can get a specific group only if it exists in their groups_list
# superadmin and admin, no restriction, can get any group by id
@router.get("/{id}", response_model=Group)
def get_specific_group(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    if not current_user:
        raise HTTPException(status_code=404, detail="Error ID: 107")  # user not found!

    if current_user.user_type == settings.UserType.STUDENT.value:
        if current_user.group_id == id:
            return get_group(db, current_user=current_user)
        else:
            raise HTTPException(
                status_code=401,
                detail="Error ID: 108",
            )  # user has no authorization to access this group

    if current_user.user_type == settings.UserType.TEACHER.value:
        for group in current_user.teacher_group:
            if group.id == id:
                return group
        raise HTTPException(
            status_code=401,
            detail="Error ID: 109",
        )  # user has no authorization to access this group

    if current_user.user_type >= settings.UserType.ADMIN.value:
        group = crud_group.get(db, id)
        return group


# update group, can be called by only the superadmin and admin
@router.put("/{id}", response_model=Group)
def update_group(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: GroupUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:

    if current_user.user_type >= settings.UserType.TEACHER.value:
        raise HTTPException(
            status_code=401,
            detail="Error ID: 110",
        )  # user has no authorization for updating groups
    else:
        group = crud_group.get(db, id)
        crud_group.update(db, db_obj=group, obj_in=obj_in)
        return {"status": "success"}
