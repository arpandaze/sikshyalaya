from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class StudentDetail(Base):
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("user.id"))
    student = relationship("User", backref="studentdetail")
    dob = Column(DateTime, nullable=False)
    address = Column(String(length=64), nullable=False)
    contact_number = Column(String(length=16), index=True, nullable=False)
    guardian_name = Column(String(length=32), index=True, nullable=False)
    guardian_contact = Column(String(length=16), index=True, nullable=False)
    enrolled_course_id = Column()
    enrolled_course = Column()
    department = Column()
    sem = Column(Integer)
    test_result = Column()
    __tablename__ = "studentdetail"