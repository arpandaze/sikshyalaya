from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from cruds.school import crud_school
from schemas import School, SchoolCreate, SchoolUpdate
from utils import deps

router = APIRouter()


@router.get("/", response_model=List[School])
async def get_schools(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
):
    schools = crud_school.get_multi(db, skip=skip, limit=limit)
    return schools


@router.post("/", response_model=School)
async def create_school(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_admin_or_above),
    *,
    school_in: SchoolCreate,
):
    school = crud_school.create(db, obj_in=school_in)
    return school


@router.get("/{school_id}/", response_model=School)
async def get_school(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_active_user),
    *,
    school_id: int,
):
    school = crud_school.get(db, school_id)
    return school


@router.put("/{school_id}/", response_model=School)
async def update_school(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_admin_or_above),
    *,
    school_id: int,
    school_update: SchoolUpdate,
):
    school = crud_school.get(db, school_id)
    school = crud_school.update(db, db_obj=school, obj_in=school_update)
    return school


@router.delete("/{school_id}/")
async def delete_school(
    db: Session = Depends(deps.get_db),
    user=Depends(deps.get_current_admin_or_above),
    *,
    school_id: int,
):
    crud_school.remove(db=db, id=school_id)
    return {"msg": "success"}
