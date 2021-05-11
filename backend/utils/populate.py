from faker import Faker

from random import randint
from core.db import SessionLocal

from cruds import (
    crud_personal_note,
    crud_user,
    crud_course,
    crud_school,
    crud_department,
    crud_teacher_note,
    crud_group,
    crud_program,
    crud_quiz,
    crud_class_session,
    crud_question,
)

from schemas import (
    PersonalNoteCreate,
    UserCreate,
    CourseCreate,
    SchoolCreate,
    DepartmentCreate,
    TeacherNoteCreate,
    GroupCreate,
    ProgramCreate,
    ClassSessionCreate,
    QuizCreate,
    QuizQuestionCreate,
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


def populate_department():
    for i in range(5):
        try:
            department = DepartmentCreate(name=fake.company(), school_id=randint(1, 2))
            crud_department.create(db, obj_in=department)
        except Exception:  # noqa
            pass
        except Exception as e:  # noqa
            print(e)


def populate_course():
    for i in range(20):
        try:
            course = CourseCreate(
                course_code=str(fake.company()[0:3].upper()) + str(randint(0, 300)),
                course_name=fake.company(),
                department_id=randint(1, 5),
            )
            crud_course.create(db, obj_in=course)
        except Exception as e:  # noqa
            print(e)


def populate_program():
    for i in range(10):
        try:
            program = ProgramCreate(name=fake.job(), department_id=randint(1, 5))
            crud_program.create(db, obj_in=program)
        except Exception as e:  # noqa
            print(e)


def populate_group():
    for i in range(10):
        try:
            group = GroupCreate(
                program_id=randint(1, 10),
                sem=randint(1, 8),
                course=list(range(randint(1, 9), randint(10, 20))),
            )
            crud_group.create(db, obj_in=group)
        except Exception as e:  # noqa
            print(e)


def populate_user():
    for i in range(50):
        try:
            user = UserCreate(
                full_name=fake.name(),
                email=fake.email(),
                group_id=randint(1, 10),
                teacher_group=list(range(randint(1, 5), randint(6, 10))),
                dob=fake.date_time(),
                address=fake.address(),
                contact_number=fake.phone_number(),
                password="test",
                user_type=randint(1, 3),
            )
            crud_user.create(db, obj_in=user)
        except Exception as e:  # noqa
            print(e)
    pass


def populate_teacher_note():
    for i in range(100):
        try:
            teacher_note = TeacherNoteCreate(
                user_id=randint(1, 50),
                student_id=randint(1, 50),
                message=fake.paragraph(),
            )
            crud_teacher_note.create(db, obj_in=teacher_note)
        except Exception as e:  # noqa
            print(e)


def populate_personal_note():
    for i in range(50):
        try:
            personal_note = PersonalNoteCreate(
                user_id=randint(1, 50),
                course_id=randint(1, 20),
                message=fake.paragraph(),
            )
            crud_personal_note.create(db, obj_in=personal_note)
        except Exception as e:  # noqa
            print(e)


def populate_quiz():
    for i in range(10):
        try:
            quiz = QuizCreate(
                end_time=fake.date_time(),
                start_time=fake.date_time(),
                title=fake.name(),
                description=fake.paragraph(),
                is_randomized=True if randint(0, 1) else False,
                display_individual=True if randint(0, 1) else False,
                group=list(range(randint(1, 5), randint(6, 10))),
                instructor=list(range(randint(1, 25), randint(26, 50))),
                course_id=randint(1, 20),
            )

            crud_quiz.create(db, obj_in=quiz)
        except Exception as e:
            print(e)


def populate_class_session():
    for i in range(10):
        try:
            class_session = ClassSessionCreate(
                datetime=fake.date_time(),
                is_active=True if randint(0, 1) else False,
                instructor=list(range(randint(1, 5), randint(6, 10))),
                course_id=randint(1, 20),
                group_id=randint(1, 10),
                description=fake.paragraph(),
                duration=randint(1, 120),
                file=[
                    "file" + str(randint(1, 200)),
                    "file" + str(randint(1, 200)),
                    "file" + str(randint(1, 200)),
                ],
            )
            crud_class_session.create(db, obj_in=class_session)

        except Exception as e:
            print(e)


def populate_quiz_question():
    for i in range(40):
        try:
            quiz_question = QuizQuestionCreate(
                question_type=randint(1, 2),
                question_text=fake.text(),
                question_image=[
                    "image" + str(randint(1, 200)),
                    "image" + str(randint(1, 200)),
                    "image" + str(randint(1, 200)),
                    "image" + str(randint(1, 200)),
                ],
                answer_type=randint(1, 4),
                option_image=[
                    "Optionimage" + str(randint(1, 200)),
                    "Optionimage" + str(randint(1, 200)),
                    "Optionimage" + str(randint(1, 200)),
                    "Optionimage" + str(randint(1, 200)),
                ],
                option={randint(1, 200): "option1", randint(1, 200): "option2"},
                answer_image="OptionImage" + str(randint(1, 200)),
                answer=randint(11, 203),
                quiz_id=randint(1, 10),
            )
            crud_question.create(db, obj_in=quiz_question)

        except Exception as e:
            print(e)


def populate_all():
    populate_school()
    populate_department()
    populate_course()
    populate_program()
    populate_group()
    populate_user()
    populate_personal_note()
    populate_teacher_note()
    populate_quiz()
    populate_class_session()
    populate_quiz_question()
