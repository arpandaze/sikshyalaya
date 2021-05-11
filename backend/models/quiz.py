from typing import TYPE_CHECKING

from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    String,
    DateTime,
    Boolean,
    ARRAY,
    JSON,
)
import enum
from sqlalchemy.orm import relationship
from .association_tables import (
    group_quiz_association_table,
    instructor_quiz_association_table,
)

from core.db import Base


class Quiz(Base):
    id = Column(Integer, primary_key=True)
    end_time = Column(DateTime)
    start_time = Column(DateTime)
    title = Column(String, nullable=True)
    description = Column(String, nullable=True)
    is_randomized = Column(Boolean, default=False)
    display_individual = Column(Boolean, default=False)
    group = relationship(
        "Group", secondary=group_quiz_association_table, backref="quiz"
    )
    instructor = relationship(
        "User", secondary=instructor_quiz_association_table, backref="quiz"
    )
    course_id = Column(Integer, ForeignKey("course.id"))
    course = relationship("Course", backref="quiz")
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

    # if IMAGE_OPTIONS in combination with option_image is present then, we show all the image in option_image, and then show all the options present in options
    option_image = Column(ARRAY(String), nullable=True)

    answer_type = Column(Integer, default=AnswerType.TEXT_OPTIONS.value, nullable=False)
    option = Column(JSON, nullable=True)

    # if IMAGE_Options present and answer == 0, then check answer_image
    answer_image = Column(String, nullable=True)
    answer = Column(Integer, nullable=True)

    # TODO: how to store image option?
    # If answer type = FILE_UPLOAD then store filename in JSON Format,
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
