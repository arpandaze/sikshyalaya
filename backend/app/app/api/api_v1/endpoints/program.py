from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email

from app.crud.crud_program import crud_program
from schemas.program import Program, ProgramUpdate, ProgramCreate

router = APIRouter()


@router.get("/program", response_model=List[Program])
def get_programs(db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100)-> Any:
    programs = crud_program.get_multi(db, skip = skip, limit = limit)
    return programs


@router.post("/program", response_model= Program)
def create_program(db: Session = Depends(deps.get_db), program_in: ProgramCreate)-> Any:
    program = crud_program.create(db, obj_in = program_in)
    return program


@router.get("/program/{program_id}", response_model = Program)
def get_program(db: Session = Depends(deps.get_db), program_id: int)-> Any:
    program = crud_program.get(db, program_id)
    return program


@router.put("/program/{program_id}", response_model = Program)
def update_program(db: Session = Depends(deps.get_db), program_id: int, program_update: ProgramUpdate)-> Any:
    program = crud_program.get(db, program_id)
    program = crud_program.update(db, db_obj = program, obj_in = program_update)
    return program
