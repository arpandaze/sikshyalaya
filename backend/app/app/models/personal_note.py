from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from .item import Item  # noqa: F401
    from .user import User  # noqa: F401
    from .course import Course  # noqa: F401


class PersonalNote(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", backref="personalnote")
    course_id = Column(Integer, ForeignKey("user.id"))
    course = relationship("Course")
    message = Column(String(length=32768))
    __tablename__ = "personalnote"
