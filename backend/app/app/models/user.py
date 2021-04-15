from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app.db.base_class import Base
from .association_tables import user_course_association_table
from app.core.config import settings


if TYPE_CHECKING:
    from .item import Item  # noqa: F401


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, index=True, nullable=False)
    enrolled_course = relationship(
        "Course", secondary=user_course_association_table, backref="users"
    )
    dob = Column(DateTime, nullable=False)
    address = Column(String(length=64), nullable=False)
    contact_number = Column(String(length=16), index=True, nullable=False)
    department_id = Column(Integer, ForeignKey("department.id"))
    department = relationship("Department", backref="students")
    sem = Column(Integer)

    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    user_type = Column(Integer, default=settings.UserType.STUDENT, nullable=False)

    items = relationship("Item", back_populates="owner")
