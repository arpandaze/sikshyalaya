from cruds.base import CRUDBase
from schemas.school import SchoolCreate, SchoolUpdate
from models.school import School


class CRUDSchool(CRUDBase[School, SchoolCreate, SchoolUpdate]):
    pass


crud_school = CRUDSchool(School)
