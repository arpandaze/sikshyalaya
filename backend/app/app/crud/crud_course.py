from app.crud.base import CRUDBase
from app.schemas.course import CourseCreate, CourseUpdate
from app.models.course import Course


class CRUDCourse(CRUDBase[Course, CourseCreate, CourseUpdate]):
    pass


crud_course = CRUDCourse(Course)
