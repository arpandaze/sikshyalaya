from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud.crud_school import crud_school
from typing import List

router = APIRouter()


@router.get("/class_session", response_model=List[int])
def get_class_session(db: Session = Depends(deps.get_db)):
    school = crud_school.get(db=db, id=2)
    return school


@router.post("/class_session")
def post_class_session(db: Session = Depends(deps.get_db)):
    pass
