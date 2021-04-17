from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import crud_group
from app.schemas import Group, GroupUpdate

router = APIRouter()


@router.get("/group", response_model=List[Group])
def get_group(
        db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    group = crud_group.get_multi(db, skip=skip, limit=limit)
    return group


@router.post("/group", response_model=Group)
def create_group(
        db: Session = Depends(deps.get_db), *, obj_in: GroupUpdate
) -> Any:
    group = crud_group.create(db, obj_in=obj_in)
    return group


@router.get("/group/{id}", response_model=Group)
def get_specific_group(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    group = crud_group.get(db, id)
    return group


@router.put("/group/{id}", response_model=Group)
def update_group(
        db: Session = Depends(deps.get_db), *, id: int, obj_in: GroupUpdate
) -> Any:
    group = crud_group.get(db, id)
    group = crud_group.update(db, db_obj=group, obj_in=obj_in)
    return group
