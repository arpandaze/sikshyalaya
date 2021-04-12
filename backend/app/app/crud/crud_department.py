from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.department import Department
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentDelete,
    DepartmentRetrieve,
)


class CRUDSchool(CRUDBase[DepartmentRetrieve, DepartmentCreate, DepartmentUpdate]):
    pass