from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime, ARRAY, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import UniqueConstraint
from sqlalchemy.sql.sqltypes import JSON


from core.db import Base


class AssignmentUpload(Base):
    id = Column(Integer, primary_key=True)

    submission_date = Column(DateTime, nullable=True)
    marks_obtained = Column(Integer, nullable=True)
    files = Column(ARRAY(JSON), nullable=True)

    assignment_id = Column(Integer, ForeignKey("assignment.id", ondelete="cascade"))
    assignment = relationship("Assignment", backref="assignment_upload")

    student_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    student = relationship("User", backref="assignment_upload")
    __table_args__ = (
        UniqueConstraint("assignment_id", "student_id", name="__student_assignment_uc"),
    )

    __tablename__ = "assignment_upload"  # noqa
