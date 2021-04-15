from app.crud.base import CRUDBase
from app.schemas.school import SchoolCreate, SchoolUpdate
from app.models.school import School


class CRUDSchool(CRUDBase[School, SchoolCreate, SchoolUpdate]):
    pass


crud_school = CRUDSchool(School)
