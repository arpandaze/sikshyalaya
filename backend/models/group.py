from core.db import Base
from sqlalchemy import Column, Integer, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship
from .association_tables import (
    group_course_association_table,
    group_quiz_association_table,
)


class Group(Base):
    id = Column(Integer, primary_key=True)
    program_id = Column(Integer, ForeignKey("program.id", ondelete="cascade"))
    program = relationship("Program", backref="groups")
    sem = Column(SmallInteger)
    course = relationship(
        "Course", secondary=group_course_association_table, backref="groups"
    )

    __tablename__ = "group"
