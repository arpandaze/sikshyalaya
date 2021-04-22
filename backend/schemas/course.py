from typing import Optional

from pydantic import BaseModel


# shared properties
class CourseBase(BaseModel):
    course_code: str
    course_name: str
    department_id: int


# properties to  recieve via API on creation
class CourseCreate(CourseBase):
    pass


# properties to recieve via API on update
class CourseUpdate(CourseBase):
    pass


class CourseInDBBase(CourseBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class CourseInDB(CourseInDBBase):
    pass


class Course(CourseInDBBase):
    pass
