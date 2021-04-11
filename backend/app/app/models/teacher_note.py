from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class TeacherNote(Base):
    id = Column(Integer, primary_key=True)
    user = Column()
    student = Column()
    message = Column(String(length=512))
    __tablename__ = "teachernote"
