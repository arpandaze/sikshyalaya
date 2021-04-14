from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email

from schemas.school import School, SchoolCreate, SchoolUpdate
from app.crud.crud_school import crud_school

router = APIRouter()


@router.get("/school", response_model=List[School])
#retrieve 100 schools
def get_schools(db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100):
    schools = crud_school.get_multi(db, skip = skip, limit = limit)
    return schools


@router.post("/school", response_model= School)
#create a school
def create_school(db: Session = Depends(deps.get_db), school_in: SchoolCreate):
    school = crud_school.create(db, obj_in = school_in)
    return program

@router.get("/school/{school_id}", response_model = School)
#get a school by id
def get_school(db: Session = Depends(deps.get_db), school_id: int):
    school = crud_school.get(db, school_id)
    return school


@router.put("/school/{school_id}", response_model = School)
#update a school given its id
def update_school(db: Session = Depends(deps.get_db), school_update: int, program_update: SchoolUpdate):
    school = crud_school.get(db, school_id)
    school = crud_school.update(db, db_obj = school, obj_in = school_update)
    return school
