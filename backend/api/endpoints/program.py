from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.responses import Response
from core.cache import cache

from cruds.program import crud_program
from cruds.group import crud_group
from schemas import Program, ProgramCreate, ProgramUpdate, GroupCreate
from utils import deps

router = APIRouter()


@router.get("/", response_model=List[Program])
@cache(timeout=60)
async def get_programs(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 500,
) -> Any:
    programs = crud_program.get_multi(db, skip=skip, limit=limit)
    return programs


@router.post("/", response_model=Program)
async def create_program(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_admin_or_above),
    *,
    program_in: ProgramCreate
) -> Any:
    program = crud_program.create(db, obj_in=Program(**program_in.dict()))
    for sem_iter in range(program_in.max_sems):
        group = GroupCreate(
            program_id=program.id,
            sem=sem_iter + 1,
        )
        print(group.dict())
        crud_group.create(db=db, obj_in=group)
    return program


@router.get("/{program_id}/", response_model=Program)
async def get_program(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_active_user),
    *,
    program_id: int
) -> Any:
    program = crud_program.get(db, program_id)
    return program


@router.put("/{program_id}/", response_model=Program)
async def update_program(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_admin_or_above),
    *,
    program_id: int,
    program_update: ProgramUpdate
) -> Any:
    program = crud_program.get(db, program_id)
    program = crud_program.update(db, db_obj=program, obj_in=program_update)
    return program
