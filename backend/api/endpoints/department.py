from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_department
from schemas import Department, DepartmentUpdate

router = APIRouter()


@router.get("/", response_model=List[Department])
def get_department(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    department = crud_department.get_multi(db, skip=skip, limit=limit)
    return department


@router.post("/", response_model=Department)
def create_department(
    db: Session = Depends(deps.get_db), *, obj_in: DepartmentUpdate
) -> Any:
    department = crud_department.create(db, obj_in=obj_in)
    return department


@router.get("/{id}", response_model=Department)
def get_specific_department(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    department = crud_department.get(db, id)
    return department


@router.put("/{id}", response_model=Department)
def update_department(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: DepartmentUpdate
) -> Any:
    department = crud_department.get(db, id)
    department = crud_department.update(db, db_obj=department, obj_in=obj_in)
    return department
