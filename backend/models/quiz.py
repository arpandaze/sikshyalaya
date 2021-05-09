from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from core.db import Base



class quiz(Base):
    id = Column(Integer, primary_key=True)
    __tablename__ = "quiz"  # noqa
