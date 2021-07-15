from typing import Optional

from pydantic import BaseModel


# shared properties
class CourseBase(BaseModel):
    course_code: str
    course_name: str
    course_credit: int
    department_id: int


# properties to  recieve via API on creation
class CourseCreate(CourseBase):
    pass


# properties to recieve via API on update
class CourseUpdate(CourseBase):
    course_code: Optional[str]
    course_name: Optional[str]
    course_credit: Optional[int]
    department_id: Optional[int]


class CourseInDBBase(CourseBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class CourseInDB(CourseInDBBase):
    pass


class Course(CourseInDBBase):
    pass


class CourseMin(BaseModel):
    id: Optional[int]
    course_code: str
    course_name: str

    class Config:
        orm_mode = True