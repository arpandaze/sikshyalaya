from datetime import datetime
from typing import Optional, List, Dict  # noqa

from pydantic import BaseModel, Json
from schemas import GroupReturn, CourseMin, TeacherShort


class QuizBase(BaseModel):
    end_time: datetime
    start_time: datetime
    title: str
    description: str
    is_randomized: bool
    display_individual: bool
    instructor: List[int]
    group: List[int]
    course_id: int
    total_marks: int = None


class QuizCreate(QuizBase):
    pass


class QuizUpdate(QuizBase):
    end_time: datetime = None
    start_time: datetime = None
    title: str = None
    description: str = None
    is_randomized: bool = None
    display_individual: bool = None
    instructor: List[int] = None
    group: List[int] = None
    course_id: int = None
    total_marks: int = None


class QuizInDBBase(QuizBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class QuizInDB(QuizInDBBase):
    pass


class Quiz(BaseModel):
    id: Optional[int]
    course: CourseMin
    end_time: datetime
    start_time: datetime
    title: str
    description: str
    is_randomized: bool
    display_individual: bool
    total_marks: int
    group: List[GroupReturn]
    instructor: List[TeacherShort]

    class Config:
        orm_mode = True


# XXX
# XXX
# Quiz Question schema


class QuizQuestionBase(BaseModel):
    question_text: str = None
    question_image: List[str] = None
    options: Json
    answer: List[int] = None
    quiz_id: int
    marks: int = None


class QuizQuestionCreate(QuizQuestionBase):
    pass


class QuizQuestionUpdate(QuizQuestionBase):
    question_text: str = None
    question_image: List[str] = None
    options: Json = None
    answer: List[int] = None
    marks: int = None
    quiz_id: int


class QuizQuestionInDBBase(QuizQuestionBase):
    id: Optional[int]
    options: List[Dict[str, str]]

    class Config:
        orm_mode = True


class QuizQuestionInDB(QuizQuestionInDBBase):
    pass


class QuizQuestion(QuizQuestionInDBBase):
    pass


class QuizQuestionwoutAnswer(BaseModel):
    id: Optional[int]
    question_text: str = None
    question_image: List[str] = None
    options: List[Dict[str, str]]
    quiz_id: int
    multiple: bool = False
    marks: int

    class Config:
        orm_mode = True
