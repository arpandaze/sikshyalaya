from datetime import datetime
from typing import Optional, List, Dict  # noqa

from pydantic import BaseModel
from schemas import GroupReturn, UserReturn


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


class QuizCreate(QuizBase):
    pass


class QuizUpdate(QuizBase):
    pass


class QuizInDBBase(QuizBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class QuizInDB(QuizInDBBase):
    pass


class Quiz(QuizInDBBase):
    group: List[GroupReturn]
    instructor: List[UserReturn]


# XXX
# XXX
# Quiz Question schema


class QuizQuestionBase(BaseModel):
    question_type: int
    question_text: str
    question_image: List[str]
    option_image: List[str]
    answer_type: int
    option: Dict[int, str]
    answer_image: str
    answer: int
    quiz_id: int


class QuizQuestionCreate(QuizQuestionBase):
    pass


class QuizQuestionUpdate(QuizQuestionBase):
    pass


class QuizQuestionInDBBase(QuizQuestionBase):
    id: Optional[int]
    option: Dict[str, str]

    class Config:
        orm_mode = True


class QuizQuestionInDB(QuizQuestionInDBBase):
    pass


class QuizQuestion(QuizQuestionInDBBase):
    pass


# XXX
# XXX
# Quiz Answer schema


class QuizAnswerBase(BaseModel):
    pass


class QuizAnswerCreate(QuizAnswerBase):
    pass


class QuizAnswerUpdate(QuizAnswerBase):
    pass


class QuizAnswerInDBBase(QuizAnswerBase):
    id: Optional[int]

    class Config:
        orm_mode = True


class QuizAnswerInDB(QuizAnswerInDBBase):
    pass


class QuizAnswer(QuizAnswerInDBBase):
    pass
