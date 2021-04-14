from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel


# shared properties
class ClassSessionBase(BaseModel):
    dateTime: datetime
    instructor: List[int]
    course_id: int
    description: str


# properties to recieve via
class ClassSessionCreate(ClassSessionBase):
    pass


# properties to recive via API on Update
class ClassSessionUpdate(ClassSessionBase):
    pass


# properties to return via the api
class ClassSessionInDBBase(ClassSessionBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class ClassSession(ClassSessionInDBBase):
    pass


class ClassSessionInDB(ClassSessionInDBBase):
    pass
