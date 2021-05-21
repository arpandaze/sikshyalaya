from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from core.db import Base


class TeacherNote(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    user = relationship("User", backref="teachernote", foreign_keys=[user_id])
    student_id = Column(Integer, ForeignKey("user.id", ondelete="cascade"))
    student = relationship("User", foreign_keys=[student_id])
    message = Column(String(length=512))
    __tablename__ = "teachernote"
