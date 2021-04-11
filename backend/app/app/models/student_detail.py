from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base

import enum

from app.core.config import settings


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class StudentDetails(Base):
    id = Column(Integer, primary_key=True)
    dob = Column(DateTime, nullable=False)
    address = Column(String(length=64), nullable=False)
    contact_number = Column(String(length=16), index=True, nullable=False)
    guardian_name = Column(String(length=32), index=True, nullable=False)
    guardian_contact = Column(String(length=16), index=True, nullable=False)
    enrolled_classes = Column()
    department = Column()
    sem = Column(Integer)
    test_results = Column()
    __tablename__ = "studentdetails"