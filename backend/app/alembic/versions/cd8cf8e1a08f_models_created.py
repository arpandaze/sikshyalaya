"""Models Created

Revision ID: cd8cf8e1a08f
Revises: 640cfd770b00
Create Date: 2021-04-12 14:42:29.228833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "cd8cf8e1a08f"
down_revision = "640cfd770b00"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "course", sa.Column("course_name", sa.String(length=128), nullable=True)
    )
    op.drop_index("ix_course_course_code", table_name="course")
    op.create_index(
        op.f("ix_course_course_code"), "course", ["course_code"], unique=True
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_course_course_code"), table_name="course")
    op.create_index("ix_course_course_code", "course", ["course_code"], unique=False)
    op.drop_column("course", "course_name")
    # ### end Alembic commands ###
