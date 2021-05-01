from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_${snake_case_name}
from schemas import ${PascalCaseName}, ${PascalCaseName}Update, ${PascalCaseName}Create

router = APIRouter()


@router.get("/${snake_case_name}", response_model=List[${PascalCaseName}])
async def get_${snake_case_name}(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    ${snake_case_name} = crud_${snake_case_name}.get_multi(db, skip=skip, limit=limit)
    return ${snake_case_name}


@router.post("/${snake_case_name}", response_model=${PascalCaseName})
async def create_${snake_case_name}(
    db: Session = Depends(deps.get_db), *, obj_in: ${PascalCaseName}Create
) -> Any:
    ${snake_case_name} = crud_${snake_case_name}.create(db, obj_in=obj_in)
    return ${snake_case_name}


@router.get("/${snake_case_name}/{id}", response_model=${PascalCaseName})
async def get_specific_${snake_case_name}(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    ${snake_case_name} = crud_${snake_case_name}.get(db, id)
    return ${snake_case_name}


@router.put("/${snake_case_name}/{id}", response_model=${PascalCaseName})
async def update_${snake_case_name}(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: ${PascalCaseName}Update
) -> Any:
    ${snake_case_name} = crud_${snake_case_name}.get(db, id)
    ${snake_case_name} = crud_${snake_case_name}.update(db, db_obj=${snake_case_name}, obj_in=obj_in)
    return ${snake_case_name}
