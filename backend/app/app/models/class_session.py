from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

from app.db.base_class import Base
from app.models.association_tables import user_class_session_association_table

import enum

from app.core.config import settings


class ClassSession(Base):
    id = Column(Integer, primary_key=True)
    datetime = Column(DateTime)
    is_active = Column(Boolean)
    instructors = relationship(
        "User",
        secondary=user_class_session_association_table,
        backref=backref("class_session", cascade="all, delete"),
    )
    course_id = Column(Integer, ForeignKey("course.id", ondelete="CASCADE"))
    course = relationship("Course", backref="session")
    group_id = Column(Integer, ForeignKey("group.id", ondelete="CASCADE"))
    group = relationship("Group", backref="class_session", uselist=False)
    description = Column(String(length=512))
    duration = Column(Integer)
    # TODO: Files for class session
    __tablename__ = "class_session"
