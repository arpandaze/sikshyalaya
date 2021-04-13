from sqlalchemy import Column, Integer, ForeignKey, Table

from app.db.base_class import Base

user_course_association_table = Table(
    "association", Base.metadata,
    Column("course_id", Integer, ForeignKey("course.id")),
    Column("user_id", Integer, ForeignKey("user.id"))
)
