from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email


from app.crud.crud_school import crud_school

router = APIRouter()


@router.get("/school")
def get_school(db: Session = Depends(deps.get_db)):
    school = crud_school.get(db=db, id=2)
    return school
