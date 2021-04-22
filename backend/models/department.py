from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from core.db import Base


class Department(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(length=128))
    school_id = Column(
        Integer,
        ForeignKey("school.id", ondelete="CASCADE"), nullable=True,
    )
    school = relationship("School", backref="departments", passive_deletes=True)
    __tablename__ = "department"
