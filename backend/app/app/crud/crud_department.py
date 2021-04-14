from app.crud.base import CRUDBase
from app.models.department import Department
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentRetrieve,
)


class CRUDDepartment(CRUDBase[DepartmentRetrieve, DepartmentCreate, DepartmentUpdate]):
    pass


crud_department = CRUDDepartment(Department)
