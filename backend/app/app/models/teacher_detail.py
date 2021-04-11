from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class TeacherDetail(Base):
    id = Column(Integer, primary_key=True)
    teacher_id = Column(Integer, ForeignKey("user.id"))
    teacher = relationship("User", backref="teacherdetail")
    __tablename__ = "teacherdetail"