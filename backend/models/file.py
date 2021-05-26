from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from core.db import Base
from datetime import datetimee


class File(Base):
    id = Column(Integer, primary_key=True)
    path = Column(String)
    file_type = Column(String)
    uploaded_datetime = Column(DateTime, default=func.now())
    description = Column(String)
    __tablename__ = "file"  # noqaa
