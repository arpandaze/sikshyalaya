import json

from pydantic.types import ConstrainedStr

from utils.populationdata import (
    users,
    schools,
    departments,
    courses,
    programs,
    groups,
    personalNotes,
    teacherNotes,
    quizzes,
    classSessions,
    quizQuestions,
)
from utils.utils import send_verification_email
from core.db import redis_session_client
import asyncio

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


def populate_school():
    for school in schools:
        crud_school.create(db, obj_in=school)


def populate_department():
    for department in departments:
        try:
            crud_department.create(db, obj_in=department)
        except Exception as e:  # noqa
            print(e)


def populate_course():
    for course in courses:
        try:
            crud_course.create(db, obj_in=course)
        except Exception as e:  # noqa
            print(e)


def populate_program():
    for program in programs:
        try:
            crud_program.create(db, obj_in=program)
        except Exception as e:  # noqa
            print(e)


def populate_group():
    for group in groups:
        try:
            group = GroupCreate(
                program_id=group["program_id"],
                sem=group["sem"],
                course=group["course"],
            )
            crud_group.create(db, obj_in=group)
        except Exception as e:  # noqa
            print(e)


def populate_user():
    for user in users:
        asyncio.run(redis_session_client.initialize())

        try:
            user = UserCreate(
                full_name=user["full_name"],
                is_active=user["is_active"],
                email=user["email"],
                group_id=user["group_id"],
                teacher_group=user["teacher_group"],
                dob=user["dob"],
                address=user["address"],
                contact_number=user["contact_number"],
                password=user["password"],
                user_type=user["user_type"],
                join_year=user["join_year"],
            )

            user_in = crud_user.create(db, obj_in=user)
            asyncio.run(send_verification_email(email_to=user.email, user=user_in))
        except Exception as e:  # noqa
            print(e)
    pass


def populate_teacher_note():
    for teacherNote in teacherNotes:
        try:
            teacherNote = TeacherNoteCreate(
                user_id=teacherNote["user_id"],
                student_id=teacherNote["student_id"],
                message=teacherNote["message"].strip(),
            )
            crud_teacher_note.create(db, obj_in=teacherNote)
        except Exception as e:  # noqa
            print(e)


def populate_personal_note():
    for personalNote in personalNotes:
        try:
            personalNote = PersonalNoteCreate(
                user_id=personalNote["user_id"],
                tags=personalNote["tags"],
                title=personalNote["title"].strip(),
                content=personalNote["content"],
            )
            crud_personal_note.create(db, obj_in=personalNote)
        except Exception as e:  # noqa
            print(e)


def populate_quiz():
    for quiz in quizzes:
        try:

            quiz = QuizCreate(
                end_time=quiz["end_time"],
                start_time=quiz["start_time"],
                title=quiz["title"],
                description=quiz["description"],
                is_randomized=quiz["is_randomized"],
                display_individual=quiz["display_individual"],
                group=quiz["group"],
                instructor=quiz["instructor"],
                course_id=quiz["course_id"],
            )

            crud_quiz.create(db, obj_in=quiz)
        except Exception as e:
            print(e)


def populate_class_session():
    for class_session in classSessions:
        try:
            class_session = ClassSessionCreate(
                datetime=class_session["datetime"],
                is_active=class_session["is_active"],
                instructor=class_session["instructor"],
                course_id=class_session["course_id"],
                group_id=class_session["group_id"],
                description=class_session["description"],
                duration=class_session["duration"],
            )
            crud_class_session.create(db, obj_in=class_session)

        except Exception as e:
            print(e)


def populate_quiz_question():
    for quiz_question in quizQuestions:
        try:
            jsonOption = quiz_question["option"]
            if jsonOption:
                dictOption = json.loads(jsonOption)
                try:
                    dictOption = {int(k): v for k, v in dictOption.items()}

                    quiz_question = QuizQuestionCreate(
                        question_type=quiz_question["question_type"],
                        question_text=quiz_question["question_text"],
                        question_image=quiz_question["question_image"],
                        answer_type=quiz_question["answer_type"],
                        option_image=quiz_question["option_image"],
                        option=dictOption,
                        answer_image=quiz_question["answer_image"],
                        answer=quiz_question["answer"],
                        quiz_id=quiz_question["quiz_id"],
                    )
                    crud_question.create(db, obj_in=quiz_question)
                except Exception as exception:
                    print(exception)
            else:
                quiz_question = QuizQuestionCreate(
                    question_type=quiz_question["question_type"],
                    question_text=quiz_question["question_text"],
                    question_image=quiz_question["question_image"],
                    answer_type=quiz_question["answer_type"],
                    option_image=quiz_question["option_image"],
                    answer_image=quiz_question["answer_image"],
                    answer=quiz_question["answer"],
                    quiz_id=quiz_question["quiz_id"],
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
