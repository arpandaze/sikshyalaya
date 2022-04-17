from typing import Optional, List, Dict, Any  # noqa

from pydantic import BaseModel

from schemas import Name


class QuizAnswerBase(BaseModel):
    marks_obtained: int = None
    options_selected: Dict[int, Any]
    quiz_id: int
    student_id: int


class QuizAnswerCreate(QuizAnswerBase):
    pass


class QuizAnswerUpdate(QuizAnswerBase):
    marks_obtained: int = None
    options_selected: Dict[int, Any] = None
    quiz_id: int = None
    student_id: int = None


class QuizAnswerInDBBase(QuizAnswerBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class QuizAnswerInDB(QuizAnswerInDBBase):
    pass


class QuizAnswer(QuizAnswerInDBBase):
    pass


class QuizAnsweronlySelected(BaseModel):
    id: Optional[int]
    options_selected: Dict[int, Any]
    quiz_id: int
    student_id: int

    class Config:
        orm_mode = True


class QuizAnswerwithName(BaseModel):
    id: Optional[int]
    marks_obtained: int
    options_selected: Dict[int, Any]
    quiz_id: int
    student: Name

    class Config:
        orm_mode = True
