from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from core.db import Base


if TYPE_CHECKING:
    from .user import User  # noqa: F401
    from .course import Course  # noqa: F401


class PersonalNote(Base):
    id = Column(Integer, primary_key=True)
    last_updated_time = Column(DateTime, default=func.now(), onupdate=func.now())
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    user = relationship("User", backref="personalnote", foreign_keys=[user_id])
    tags = Column(ARRAY(String(length=32)))
    title = Column(String(length=128))
    content = Column(String(length=32768))
    __tablename__ = "personalnote"
