from tokenize import group
from typing import Optional, List, Any  # noqa

from datetime import datetime
from pydantic import BaseModel
from schemas import TeacherShort, CourseMin, GroupReturn, Name


class AssignmentUploadBase(BaseModel):
    submission_date: datetime
    marks_obtained: int = None
    assignment_id: int
    files: List[Any] = None
    student_id: int


class AssignmentUploadCreate(AssignmentUploadBase):
    pass


class AssignmentUploadUpdate(AssignmentUploadBase):
    submission_date: Optional[datetime]
    marks_obtained: Optional[int]
    assignment_id: Optional[int]
    files: List[Any] = None
    student_id: Optional[int]


class AssignmentUploadInDBBase(AssignmentUploadBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class AssignmentUploadInDB(AssignmentUploadInDBBase):
    pass


class AssignmentUpload(AssignmentUploadInDBBase):
    pass


class AssignmentUploadwithName(BaseModel):
    id: Optional[int]
    submission_date: datetime
    marks_obtained: int = None
    assignment_id: int
    files: List[Any] = None
    student: Name
    student_id: int

    class Config:
        orm_mode = True
