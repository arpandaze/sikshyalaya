from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class Department(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(length=128))
    school_id = Column(Integer, ForeignKey("school.id"))
    school = relationship("School", back_populates="department")
    __tablename__ = "department"