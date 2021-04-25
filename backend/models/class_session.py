from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from core.db import Base
from models.association_tables import user_class_session_association_table


class ClassSession(Base):
    id = Column(Integer, primary_key=True)
    datetime = Column(DateTime)
    is_active = Column(Boolean)
    instructors = relationship(
        "User", secondary=user_class_session_association_table, backref="class_session"
    )
    course_id = Column(Integer, ForeignKey("course.id"))
    course = relationship("Course", backref="session")
    group_id = Column(Integer, ForeignKey("group.id"))
    group = relationship("Group", backref="class_session", uselist=False)
    duration = Column(Integer)
    description = Column(String(length=128))
    __tablename__ = "class_session"
