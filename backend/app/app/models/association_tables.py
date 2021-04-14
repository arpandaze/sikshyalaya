from sqlalchemy import Column, Integer, ForeignKey, Table

from app.db.base_class import Base

user_course_association_table = Table(
    "association",
    Base.metadata,
    Column("course_id", Integer, ForeignKey("course.id")),
    Column("user_id", Integer, ForeignKey("user.id")),
)

user_class_session_association_table = Table(
    "association",
    Base.metadata,
    Column("class_session_id", Integer, ForeignKey("class_session.id")),
    Column("user_id", Integer, ForeignKey("user.id")),
)
