from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.db import redis_cache_client
from cruds.crud_program import crud_program
from schemas import Program, ProgramCreate, ProgramUpdate
from utils import deps

router = APIRouter()


@router.get("/program", response_model=List[Program])
async def get_programs(
        db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    programs = crud_program.get_multi(db, skip=skip, limit=limit)
    return programs


@router.post("/program", response_model=Program)
async def create_program(
        db: Session = Depends(deps.get_db), *, program_in: ProgramCreate
) -> Any:
    program = crud_program.create(db, obj_in=program_in)
    return program


@router.get("/program/{program_id}", response_model=Program)
async def get_program(db: Session = Depends(deps.get_db), *, program_id: int) -> Any:
    program = crud_program.get(db, program_id)
    return program


@router.put("/program/{program_id}", response_model=Program)
async def update_program(
        db: Session = Depends(deps.get_db),
        *,
        program_id: int,
        program_update: ProgramUpdate
) -> Any:
    program = crud_program.get(db, program_id)
    program = crud_program.update(db, db_obj=program, obj_in=program_update)
    return program


@router.get("/redis/1")
async def redis_test(
        db: Session = Depends(deps.get_db),
) -> Any:
    res = await redis_cache_client.get("test", "utf-8")
    return {"msg": res}


@router.get("/redis/2", response_model=Program)
async def redis_test(
        db: Session = Depends(deps.get_db),
) -> Any:
    res = await redis_cache_client.set("test", "daze123")
    return res
