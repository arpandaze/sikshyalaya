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

# Get:
# All

# Post, Update:
# Only admin and above


@router.get("/", response_model=List[Course])
def get_course(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    course = crud_course.get_multi(db, skip=skip, limit=limit)
    return course


@router.post("/course", response_model=Course)
def create_course(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: CourseCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    if current_user:
        if current_user.user_type > settings.UserType.TEACHER:
            course = crud_course.create(db, obj_in=obj_in)
            return course
        else:
            raise HTTPException(
                status_code=401,
                detail="user has no authorization for creating courses",
            )
    else:
        raise HTTPException(status_code=404, detail="user not found!")


@router.get("/{id}", response_model=Course)
def get_specific_course(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    course = crud_course.get(db, id)
    return course


@router.put("/{id}", response_model=Course)
def update_course(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: CourseUpdate
) -> Any:
    course = crud_course.get(db, id)
    course = crud_course.update(db, db_obj=course, obj_in=obj_in)
    return course
