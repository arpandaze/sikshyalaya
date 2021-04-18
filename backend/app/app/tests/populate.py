from faker import Faker

from app.api.deps import get_db
from random import randint
from fastapi import Depends
from app.db.session import SessionLocal

from app.crud import (
    crud_personal_note,
    crud_user,
    crud_course,
    crud_class_session,
    crud_school,
    crud_department,
    crud_teacher_note,
    crud_group,
    crud_program,
)

from app.schemas import (
    PersonalNoteCreate,
    UserCreate,
    CourseCreate,
    ClassSessionCreate,
    SchoolCreate,
    DepartmentCreate,
    TeacherNoteCreate,
    GroupCreate,
    ProgramCreate,
)

db = SessionLocal()

fake = Faker()


def populate_school():
    schools = [
        SchoolCreate(name="SOS", address="Dhulikhel"),
        SchoolCreate(name="SOE", address="Banepa"),
    ]
    for school in schools:
        crud_school.create(db, obj_in=school)


def populate_departments():
    for i in range(5):
        try:
            department = DepartmentCreate(name=fake.company(), school_id=randint(1, 2))
            crud_department.create(db, obj_in=department)
        except Exception:  # noqa
            pass


def populate_course():
    for i in range(20):
        try:
            course = CourseCreate(
                course_code=str(fake.company()[0:3].upper()) + str(randint(0, 300)),
                course_name=fake.company(),
                department_id=randint(1, 5),
            )
            crud_course.create(db, obj_in=course)
        except Exception:  # noqa
            pass


def populate_program():
    for i in range(10):
        try:
            program = ProgramCreate(name=fake.job(), department_id=randint(2, 6))
            crud_program.create(db, obj_in=program)
        except Exception:  # noqa
            pass


def populate_group():
    for i in range(10):
        try:
            group = GroupCreate(program_id=randint(1, 10), sem=randint(1, 8))
            crud_group.create(db, obj_in=group)
        except Exception:  # noqa
            pass


def populate_user():
    for i in range(50):
        try:
            user = UserCreate(
                full_name=fake.full_name(),
                email=fake.email(),
                group_id=randint(1, 10),
                enrolled_course=range(randint(1, 9), randint(10, 20)),
                dob=fake.datetime(),
                address=fake.address(),
                contact=fake.contact(),
                password=fake.password(),
            )
            crud_user.create(db, obj_in=user)
        except Exception:  # noqa
            pass
    pass


def populate_teacher_note():
    for i in range(100):
        try:
            teacher_note = TeacherNoteCreate(
                user_id=randint(1, 50),
                student_id=randint(1, 50),
                message=fake.paragraph,
            )
            crud_teacher_note.create(db, obj_in=teacher_note)
        except Exception:  # noqa
            pass


def populate_personal_note():
    for i in range(50):
        try:
            personal_note = PersonalNoteCreate(
                user_id=randint(1, 50),
                course_id=randint(1, 20),
                message=fake.paragraph(),
            )
            crud_personal_note(db, personal_note)
        except Exception:  # noqa
            pass


if __name__ == "__main__":
    # populate_school()
    # populate_departments()
    # populate_program()
    populate_group()
    # populate_course()
