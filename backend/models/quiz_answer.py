from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import UniqueConstraint

from sqlalchemy.sql.sqltypes import JSON

from core.db import Base

# models for storing answers
class QuizAnswer(Base):
    id = Column(Integer, primary_key=True)
    marks_obtained = Column(Integer)
    options_selected = Column(JSON)

    quiz_id = Column(Integer, ForeignKey("quiz.id", ondelete="cascade"))
    quiz = relationship("Quiz", backref="quiz_answer")

    student_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    student = relationship("User", backref="quiz_answer")

    __table_args__ = (
        UniqueConstraint("quiz_id", "student_id", name="__student_quiz_uc"),
    )

    __tablename__ = "quiz_answer"  # noqa