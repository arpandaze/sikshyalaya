from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime, ARRAY, ForeignKey
from sqlalchemy.orm import relationship
from .association_tables import (
    assignment_group_association_table,
    assignment_instructor_association_table,
)

from sqlalchemy.sql.sqltypes import JSON

from core.db import Base

"""Assignments can have contents, files, due_date, marks, title, course, group, teacher,"""


class Assignment(Base):
    id = Column(Integer, primary_key=True)
    due_date = Column(DateTime, nullable=True)
    marks = Column(Integer, nullable=True)
    title = Column(String(length=2048))
    contents = Column(String(length=32168))
    files = Column(ARRAY(JSON), nullable=True)
    instructor = relationship(
        "User", secondary=assignment_instructor_association_table, backref="assignments"
    )
    group = relationship(
        "Group", secondary=assignment_group_association_table, backref="assignments"
    )
    course_id = Column(Integer, ForeignKey("course.id", ondelete="cascade"))
    course = relationship("Course", backref="assignment")
    __tablename__ = "assignment"  # noqa
