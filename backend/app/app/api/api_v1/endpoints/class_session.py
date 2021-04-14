from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models
from app.api import deps
from app.crud.crud_school import crud_school
from app.schemas import ClassSession

router = APIRouter()


@router.get(
    "/class_session",
    response_model=List[ClassSession],
)
def get_class_session(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
):
    school = crud_school.get(db=db, id=2)
    return school


@router.post("/class_session")
def post_class_session(db: Session = Depends(deps.get_db)):
    pass
