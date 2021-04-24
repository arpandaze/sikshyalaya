from cruds.base import CRUDBase
from models.department import Department
from schemas.department import DepartmentCreate, DepartmentUpdate


class CRUDDepartment(CRUDBase[Department, DepartmentCreate, DepartmentUpdate]):
    pass


crud_department = CRUDDepartment(Department)
