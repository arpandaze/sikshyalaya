from typing import TYPE_CHECKING

from app.db.base_class import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class Group(Base):
    id = Column(Integer, primary_key=True)
    program_id = Column(Integer, ForeignKey("program.id"))
    program = relationship("Program", backref="groups")
    sem = Column(Integer)
    __tablename__ = "department"
