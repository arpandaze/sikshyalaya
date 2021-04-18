from app.db.base_class import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Course(Base):
    id = Column(Integer, primary_key=True)
    course_code = Column(String, index=True, unique=True)
    course_name = Column(String(128), nullable=False)
    department_id = Column(Integer, ForeignKey("department.id"))
    department = relationship("Department", backref="courses")
    __tablename__ = "course"
