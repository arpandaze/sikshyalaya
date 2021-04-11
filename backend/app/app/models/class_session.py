from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum

from app.core.config import settings


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class ClassSession(Base):
    id = Column(Integer, primary_key=True)
    datetime = Column(DateTime)
    instructor: Column()
    course = Column()
    description = Column(String(length=128))
    __tablename__ = "classsession"