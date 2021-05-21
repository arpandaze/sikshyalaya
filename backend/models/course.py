from sqlalchemy.sql.sqltypes import SmallInteger
from core.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship


class Course(Base):
    id = Column(Integer, primary_key=True)
    course_code = Column(String, index=True, unique=True)
    course_name = Column(String(128), nullable=False)
    course_credit = Column(SmallInteger)
    department_id = Column(Integer, ForeignKey("department.id", ondelete="cascade"))
    department = relationship("Department", backref="courses")
    __tablename__ = "course"
