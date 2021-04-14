from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_course
from app.schemas import Course, CourseUpdate

router = APIRouter()


@router.get("/course", response_model=List[Course])
def get_course(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    course = crud_course.get_multi(db, skip=skip, limit=limit)
    return course


@router.post("/course", response_model=Course)
def create_course(db: Session = Depends(deps.get_db), *, obj_in: CourseUpdate) -> Any:
    course = crud_course.create(db, obj_in=obj_in)
    return course


@router.get("/course/{id}", response_model=Course)
def get_specific_course(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    course = crud_course.get(db, id)
    return course


@router.put("/course/{id}", response_model=Course)
def update_course(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: CourseUpdate
) -> Any:
    course = crud_course.get(db, id)
    course = crud_course.update(db, db_obj=course, obj_in=obj_in)
    return course
