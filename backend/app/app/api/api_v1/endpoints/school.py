from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email

from schemas.school import
from app.crud.crud_school import crud_school

router = APIRouter()


@router.get("/school", response_model=List[Program])
def get_programs(db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100):
    programs = crud_program.get_multi(db, skip = skip, limit = limit)
    return programs


@router.post("/school", response_model= Program)
def create_program(db: Session = Depends(deps.get_db), program_in: ProgramCreate):
    program = crud_program.create(db, obj_in = program_in)
    return program

@router.get("/school/{program_id}", response_model = Program)
def get_program(db: Session = Depends(deps.get_db), program_id: int):
    program = crud_program.get(db, program_id)
    return program


@router.put("/school/{program_id}", response_model = Program)
def update_program(db: Session = Depends(deps.get_db), program_id: int, program_update: ProgramUpdate):
    program = crud_school.get(db, program_id)
    program = crud_school.update(db, db_obj = program, obj_in = program_update)
    return program
