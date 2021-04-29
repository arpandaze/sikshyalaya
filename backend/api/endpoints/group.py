from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_group
from schemas import Group, GroupUpdate

router = APIRouter()


@router.get("/", response_model=List[Group])
def get_group(
        db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    group = crud_group.get_multi(db, skip=skip, limit=limit)
    return group


@router.post("/", response_model=Group)
def create_group(
        db: Session = Depends(deps.get_db), *, obj_in: GroupUpdate
) -> Any:
    group = crud_group.create(db, obj_in=obj_in)
    return group


@router.get("/{id}", response_model=Group)
def get_specific_group(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    group = crud_group.get(db, id)
    return group


@router.put("/{id}", response_model=Group)
def update_group(
        db: Session = Depends(deps.get_db), *, id: int, obj_in: GroupUpdate
) -> Any:
    group = crud_group.get(db, id)
    group = crud_group.update(db, db_obj=group, obj_in=obj_in)
    return group
