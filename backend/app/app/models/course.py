from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum

from app.core.config import settings




class Course(Base):
    id = Column(Integer, primary_key=True)
    course_code = Column(String, index=True, unique=True)
    course_name = Column(String(128), nullable=False)
    __tablename__ = "course"
