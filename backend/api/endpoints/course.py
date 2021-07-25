from manage import crud
from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_course
from schemas.course import Course, CourseCreate, CourseUpdate
from core import settings
from models import User
from fastapi import HTTPException

router = APIRouter()


# get course, can be called by any user (1 through 4)
@router.get("/", response_model=List[Course])
def get_course(
    current_user: User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    course = crud_course.get_multi(db, skip=skip, limit=limit)
    return course


# add a new course, only executed if the user is either a super admin or admin
@router.post("/")
def create_course(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: CourseCreate,
    current_user: User = Depends(deps.get_current_admin_or_above),
) -> Any:
    crud_course.create(db, obj_in=obj_in)
    return {"status": "success"}


# get a specific course, can be called by any user (1 through 4)
@router.get("/{id}/", response_model=Course)
def get_specific_course(
    current_user: User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
    *,
    id: int,
) -> Any:
    course = crud_course.get(db, id)
    return course


# update a specific user, can be called by only admin and superadmin
@router.put("/{id}/")
def update_course(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: CourseUpdate,
    current_user: User = Depends(deps.get_current_admin_or_above),
) -> Any:
    course = crud_course.get(db, id)
    crud_course.update(db, db_obj=course, obj_in=obj_in)
    return {"status": "success"}


@router.delete("/{course_id}/")
async def delete_course(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_admin_or_above),
    *,
    course_id: int,
):
    crud_course.remove(db=db, id=course_id)
    return {"msg": "success"}
