from typing import Optional

from pydantic import BaseModel


# shared properties
class TeacherNoteBase(BaseModel):
    user_id: int
    student_id: int
    message: str


# properties to recieve via
class TeacherNoteCreate(TeacherNoteBase):
    student_id: int
    message: str


# properties to recive via API on Update
class TeacherNoteUpdate(TeacherNoteBase):
    pass


# properties to return via the api
class TeacherNoteInDBBase(TeacherNoteBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class TeacherNoteInDB(TeacherNoteInDBBase):
    pass


class TeacherNote(TeacherNoteInDBBase):
    pass
