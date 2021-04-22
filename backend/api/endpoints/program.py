from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds.crud_program import crud_program
from schemas import Program, ProgramCreate, ProgramUpdate
import aioredis

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


# @router.get("/redis/{data}/{data2}")
# async def redis_test(
#         db: Session = Depends(deps.get_db),
#         *,
#         data: str,
#         data2: str,
# ) -> Any:
#     client = await aioredis_client
#     await client.set(data, data2)
#     return {"msg":"done"}
#
#
# @router.post("/redis/{data}", response_model=Program)
# async def redis_test(
#         db: Session = Depends(deps.get_db),
#         *,
#         data: str,
# ) -> Any:
#     client = await aioredis_client
#     return await client.get(data, encoding="utf-8")
