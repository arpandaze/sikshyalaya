from app.crud.base import CRUDBase
from app.models.department import Department
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
    Department,
)


class CRUDDepartment(CRUDBase[Department, DepartmentCreate, DepartmentUpdate]):
    pass


crud_department = CRUDDepartment(Department)
