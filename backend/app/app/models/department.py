from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum

from app.core.config import settings


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class Department(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(length=128, unique=True))
    school = Column()
    __tablename__ = "department"