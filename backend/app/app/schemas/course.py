from pydantic import BaseModel


# shared properties
class CourseBase(BaseModel):
    course_code: str
    course_name: str


# properties to  recieve via API on creation
class CourseCreate(CourseBase):
    pass


# properties that is stored on the DB
class CourseOnDB(CourseBase):
    id: int


# properties to recieve via API on update
class CourseUpdate(CourseOnDB):
    pass


# additional properties to return via API
class Course(CourseOnDB):
    pass
