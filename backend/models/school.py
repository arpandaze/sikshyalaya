from sqlalchemy import Column, Integer, String

from core.db import Base



class School(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(length=128), nullable=False)
    address = Column(String(length=64))
    __tablename__ = "school"  # noqa
