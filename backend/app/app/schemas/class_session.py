from pydantic import BaseModel
from datetime import datetime
from typing import Optional

#shared properties
class ClassSessionBase(BaseModel):
    dateTime: datetime
    instructor: int #finalize this
    course_id: int
    description: str

#properties to recieve via
class ClassSessionCreate(ClassSessionBase):
    pass

#properties to recive via API on Update
class ClassSessionUpdate(ClassSessionBase):
    pass

#properties to return via the api
class ClassSession(ClassSessionBase):
    id: Optional[int]
    class Config:
        orm_mode = True
