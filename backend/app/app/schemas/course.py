from pydantic import BaseModel
from typing import Optional


class CourseBase(BaseModel):
    course_code: str
    course_name: str


class CourseCreate(CourseBase):
    pass


class CourseOnDB(CourseBase):
    id: int


class CourseUpdate(CourseOnDB):
    pass


class Course(CourseOnDB):
    pass
