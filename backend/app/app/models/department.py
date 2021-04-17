from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base




class Department(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(length=128))
    school_id = Column(Integer, ForeignKey("school.id"))
    school = relationship("School", backref="departments")
    __tablename__ = "department"
