from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email
from app.schemas.course import Course, CourseUpdate, CourseCreate, CourseOnDB


from app.crud.crud_course import crud_course

router = APIRouter()


@router.get("/course")
def get_course(db: Session = Depends(deps.get_db)):
    school = crud_course.get(db=db, id=2)
    return school


@router.post("/", response_model=Course)
def create_user(
        *,
        db: Session = Depends(deps.get_db),
        user_in: CourseCreate,
) -> Any:
    create_user.create()

