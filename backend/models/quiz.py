from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime, Boolean, ARRAY, JSON
import enum
from sqlalchemy.orm import relationship

from core.db import Base


class Quiz(Base):
    id = Column(Integer, primary_key=True)
    end_time = Column(DateTime)
    start_time = Column(DateTime)
    title = Column(String)
    description = Column(String)
    is_randomized = Column(Boolean, default=False)
    display_individual = Column(Boolean, default=False)
    __tablename__ = "quiz"  # noqa


class AnswerType(enum.Enum):
    TEXT_OPTIONS: int = 1
    IMAGE_OPTIONS: int = 2
    FILE_UPLOAD: int = 3
    TEXT_TYPING: int = 4


class QuestionType(enum.Enum):
    TEXT: int = 1
    IMAGE: int = 2


class QuizQuestion(Base):
    id = Column(Integer, primary_key=True)
    question_type = Column(Integer, default=QuestionType.TEXT.value, nullable=False)
    question_text = Column(String, nullable=True)
    question_image = Column(ARRAY(String), nullable=True)
    answer_type = Column(Integer, default=AnswerType.TEXT_OPTIONS.value, nullable=False)
    options = Column(JSON, nullable=True)
    answer = Column(Integer, nullable=True)

    # TODO: how to store image option,
    # If answer type = FILE_UPLOAD then store name in JSON Format,
    # if answer is in text format, then simple plain text,
    # if IMAGE Option, then have a prefix to the JSON Vlaue side,
    # and if TEXT_TYPING store options = none
    # TODO: store multiple files upload

    quiz_id = Column(Integer, ForeignKey("quiz.id"))
    quiz = relationship("Quiz", backref="question")

    __tablename__ = "quiz_question"  # noqa


# for storing user answers
class QuizAnswer(Base):
    id = Column(Integer, primary_key=True)
    # user_id
    # question_id
    __tablename__ = "quiz_answer"  # noqa
