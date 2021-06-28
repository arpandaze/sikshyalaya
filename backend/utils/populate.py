import json
from schemas.quiz_answer import QuizAnswerCreate

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
    quizAnswers,
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
    crud_quiz_answer,
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
    Program,
    ClassSessionCreate,
    QuizCreate,
    QuizQuestionCreate,
    QuizAnswer,
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
            program_xx = crud_program.create(db, obj_in=Program(**program))
            for sem_iter in range(program.get("max_sems")):
                group = GroupCreate(
                    program_id=program_xx.id,
                    sem=sem_iter + 1,
                )
                crud_group.create(db=db, obj_in=group)
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
            crud_group.update(
                db,
                db_obj=crud_group.get_by_program_and_sem(
                    db, program=group.program_id, sem=group.sem
                ),
                obj_in=group,
            )
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
                roll=user.get("roll"),
                teacher_department_id=user.get("teacher_department_id"),
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
            asyncio.run(send_verification_email(user=user_in))
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
                total_marks=quiz["total_marks"],
            )

            crud_quiz.create(db, obj_in=quiz)
        except Exception as e:
            print(e)


def populate_class_session():
    for class_session in classSessions:
        try:
            class_session = ClassSessionCreate(
                start_time=class_session["start_time"],
                is_active=class_session["is_active"],
                instructor=class_session["instructor"],
                course_id=class_session["course_id"],
                group_id=class_session["group_id"],
                description=class_session["description"],
                end_time=class_session["end_time"],
            )
            crud_class_session.create(db, obj_in=class_session)

        except Exception as e:
            print(e)


def populate_quiz_question():
    for quiz_question in quizQuestions:
        try:
            quiz_question = QuizQuestionCreate(
                question_text=quiz_question["question_text"],
                question_image=quiz_question["question_image"],
                options=quiz_question["options"],
                answer=quiz_question["answer"],
                quiz_id=quiz_question["quiz_id"],
                marks=quiz_question["marks"],
            )
            crud_question.create(db, obj_in=quiz_question)
        except Exception as e:
            print(e)


def populate_quiz_answer():
    for quiz_answer in quizAnswers:
        try:
            quiz_answer = QuizAnswerCreate(
                marks_obtained=quiz_answer["marks_obtained"],
                options_selected=quiz_answer["options_selected"],
                quiz_id=quiz_answer["quiz_id"],
                student_id=quiz_answer["student_id"],
            )

            crud_quiz_answer.create(db, obj_in=quiz_answer)
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
    populate_quiz_answer()
