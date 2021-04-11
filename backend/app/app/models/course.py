from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum

from app.core.config import settings


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class Course(Base):
    id = Column(Integer, primary_key=True)
    course_code = Column(
        String,
        index=True,
    )
    __tablename__ = "course"
