from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Enum

from core.db import Base
from datetime import datetime


class File(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String)
    path = Column(String)
    file_type = Column(String)
    uploaded_datetime = Column(DateTime, default=func.now())
    class_session_id = Column(
        Integer,
        ForeignKey("class_session.id", ondelete="CASCADE"),
        nullable=False,
    )
    class_session = relationship("ClassSession", backref="files", passive_deletes=True)
    description = Column(String)
    __tablename__ = "file"  # noqa
