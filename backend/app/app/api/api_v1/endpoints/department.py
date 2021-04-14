from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_department
from app.schemas import Department, DepartmentUpdate

router = APIRouter()


@router.get("/department", response_model=List[Department])
def get_department(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    department = crud_department.get_multi(db, skip=skip, limit=limit)
    return department


@router.post("/department", response_model=Department)
def create_department(
    db: Session = Depends(deps.get_db), *, obj_in: DepartmentUpdate
) -> Any:
    department = crud_department.create(db, obj_in=obj_in)
    return department


@router.get("/department/{id}", response_model=Department)
def get_specific_department(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    department = crud_department.get(db, id)
    return department


@router.put("/department/{id}", response_model=Department)
def update_department(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: DepartmentUpdate
) -> Any:
    department = crud_department.get(db, id)
    department = crud_department.update(db, db_obj=department, obj_in=obj_in)
    return department
