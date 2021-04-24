from cruds.base import CRUDBase
from schemas.course import CourseCreate, CourseUpdate
from models.course import Course


class CRUDCourse(CRUDBase[Course, CourseCreate, CourseUpdate]):
    pass


crud_course = CRUDCourse(Course)
