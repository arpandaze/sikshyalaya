from datetime import date, time
from typing import Optional, List, Dict  # noqa

from pydantic import BaseModel, Json
from schemas import GroupReturn, UserReturnMin, TeacherShort


class QuizBase(BaseModel):
    end_time: time
    start_time: time
    date: date
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
    end_time: time = None
    start_time: time = None
    date: date = None
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


class Quiz(QuizInDBBase):
    group: List[GroupReturn]
    instructor: List[TeacherShort]


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

    class Config:
        orm_mode = True


# XXX
# XXX
# Quiz Answer schema


class QuizAnswerBase(BaseModel):
    marks_gotten: int
    total_marks: int
    options_selected: List[int]
    question_id: int
    user_id: int


class QuizAnswerCreate(QuizAnswerBase):
    pass


class QuizAnswerUpdate(QuizAnswerBase):
    marks_gotten: int = None
    total_marks: int = None
    options_selected: List[int] = None
    question_id: int = None
    user_id: int = None


class QuizAnswerInDBBase(QuizAnswerBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class QuizAnswerInDB(QuizAnswerInDBBase):
    pass


class QuizAnswer(QuizAnswerInDBBase):
    pass
