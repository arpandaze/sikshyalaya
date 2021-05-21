from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from core.db import Base


class Program(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(length=64))
    department_id = Column(Integer, ForeignKey("department.id", ondelete="cascade"))
    department = relationship("Department", backref="programs")
    __tablename__ = "program"
