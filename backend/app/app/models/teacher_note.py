from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base




class TeacherNote(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", backref="teachernote", foreign_keys=[user_id])
    student_id = Column(Integer, ForeignKey("user.id"))
    student = relationship("User", foreign_keys=[student_id])
    message = Column(String(length=512))
    __tablename__ = "teachernote"
