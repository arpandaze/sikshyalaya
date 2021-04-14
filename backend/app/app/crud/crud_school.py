from app.crud.base import CRUDBase
from app.schemas.school import SchoolCreate, SchoolDelete, SchoolRetrieve, SchoolUpdate
from app.models.school import School


class CRUDSchool(CRUDBase[SchoolRetrieve, SchoolCreate, SchoolUpdate]):
    pass


crud_school = CRUDSchool(School)
