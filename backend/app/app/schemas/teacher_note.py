from pydantic import BaseModel
from typing import Optional

#shared properties
class TeacherNoteBase(BaseModel):
    user_id: int
    student_id: int
    message: str

#properties to recieve via
class TeacherNoteCreate(TeacherNoteBase):
    pass

#properties to recive via API on Update
class TeacherNoteUpdate(TeacherNoteBase):
    pass

#properties to return via the api
class TeacherNote(TeacherNoteBase):
    id: Optional[int]
    class Config:
        orm_mode = True
