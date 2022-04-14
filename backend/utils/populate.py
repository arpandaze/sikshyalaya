import json
from schemas.quiz_answer import QuizAnswerCreate
from fastapi.encoders import jsonable_encoder

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
    assignments,
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
    crud_assignment,
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
    AssignmentCreate,
)

db = SessionLocal()


created_schools = []

def eprint(text):
    print(f"\033[91m{text}\033[0m")


def populate_school():
    for school in schools:
        print(f"Populating school: {school}")
        created_school = crud_school.create(db, obj_in=school)
        created_schools.append(created_school.id)


created_departments = []
def populate_department():
    for department in departments:
        try:
            print(f"Populating department: {department}")
            department.update({"school_id": created_schools[department["school_id"]-1]})
            created_department = crud_department.create(db, obj_in=department)
            created_departments.append(created_department.id)
        except Exception as e:  # noqa
            eprint(e)


created_courses = []
def populate_course():
    for course in courses:
        try:
            print(f"Populating course: {course}")
            course.update({"department_id": created_departments[course["department_id"]-1]})
            created_course = crud_course.create(db, obj_in=course)
            created_courses.append(created_course.id)
        except Exception as e:  # noqa
            eprint(e)


created_programs = []
created_groups = []
def populate_program():
    for program in programs:
        try:
            print(f"Populating program: {program}")
            program.update({"department_id": created_departments[program["department_id"]-1]})
            program_xx = crud_program.create(db, obj_in=Program(**program))
            created_programs.append(program_xx.id)
            for sem_iter in range(program.get("max_sems")):
                group = GroupCreate(
                    program_id=program_xx.id,
                    sem=sem_iter + 1,
                )
                created_group = crud_group.create(db=db, obj_in=group)
                created_groups.append(created_group.id)
        except Exception as e:  # noqa
            eprint(e)


def populate_group():
    for group in groups:
        try:
            print(f"Populating group: {group}")
            group = GroupCreate(
                program_id=group["program_id"],
                sem=group["sem"],
                course=[created_courses[i-1] for i in group["course"]],
            )
            crud_group.update(
                db,
                db_obj=crud_group.get_by_program_and_sem(
                    db, program=group.program_id, sem=group.sem
                ),
                obj_in=group,
            )
        except Exception as e:  # noqa
            eprint(e)


created_users = []
def populate_user():
    for user in users:
        asyncio.run(redis_session_client.initialize())

        try:
            print(f"Populating user: {user}")
            group_id = created_groups[user["group_id"]-1] if user["group_id"] else None
            teacher_department_id=created_departments[user.get("teacher_department_id")-1] if user.get("teacher_department_id") else None
            user = UserCreate(
                full_name=user["full_name"],
                is_active=user["is_active"],
                email=user["email"],
                roll=user.get("roll"),
                teacher_department_id=teacher_department_id,
                group_id=group_id,
                teacher_group=[[created_groups[i[0]-1], created_courses[i[1]-1]] for i in user["teacher_group"] ],
                dob=user["dob"],
                address=user["address"],
                contact_number=user["contact_number"],
                password=user["password"],
                user_type=user["user_type"],
                join_year=user["join_year"],
            )

            user_in = crud_user.create(db, obj_in=user)
            created_users.append(user_in.id)
            asyncio.run(send_verification_email(user=user_in))
        except Exception as e:  # noqa
            eprint(e)
    pass


def populate_teacher_note():
    for teacherNote in teacherNotes:
        try:
            print(f"Populating teacher note: {teacherNotes}")

            user_id=created_users[teacherNote.get("user_id")-1] if teacherNote.get("user_id") else None
            student_id=created_users[teacherNote.get("student_id")-1] if teacherNote.get("student_id") else None

            teacherNote = TeacherNoteCreate(
                user_id=user_id,
                student_id=student_id,
                message=teacherNote["message"].strip(),
            )
            crud_teacher_note.create(db, obj_in=teacherNote)
        except Exception as e:  # noqa
            eprint(e)


def populate_personal_note():
    for personalNote in personalNotes:
        try:
            print(f"Populating personal note: {personalNote}")

            user_id=created_users[personalNote.get("user_id")-1] if personalNote.get("user_id") else None

            personalNote = PersonalNoteCreate(
                user_id=user_id,
                tags=personalNote["tags"],
                title=personalNote["title"].strip(),
                content=personalNote["content"],
            )
            crud_personal_note.create(db, obj_in=personalNote)
        except Exception as e:  # noqa
            eprint(e)


created_quizzes = []
def populate_quiz():
    for quiz in quizzes:
        try:
            print(f"Populating quiz: {quiz}")
            quiz = QuizCreate(
                end_time=quiz["end_time"],
                start_time=quiz["start_time"],
                title=quiz["title"],
                description=quiz["description"],
                is_randomized=quiz["is_randomized"],
                display_individual=quiz["display_individual"],
                group=[ created_groups[i-1] for i in quiz["group"]],
                instructor=[ created_users[i-1] for i in quiz["instructor"] ],
                course_id=created_courses[quiz["course_id"]-1],
                total_marks=quiz["total_marks"],
            )

            created_quiz = crud_quiz.create(db, obj_in=quiz)
            created_quizzes.append(created_quiz.id)
        except Exception as e:
            eprint(e)


def populate_class_session():
    for class_session in classSessions:
        try:
            print(f"Populating class session: {class_session}")

            instructor=[created_users[i-1] for i in class_session["instructor"]]
            course_id=created_courses[class_session["course_id"]-1]
            group_id=created_groups[class_session["group_id"]-1]

            class_session = ClassSessionCreate(
                start_time=class_session["start_time"],
                is_active=class_session["is_active"],
                instructor=instructor,
                course_id=course_id,
                group_id=group_id,
                description=class_session["description"],
                end_time=class_session["end_time"],
            )
            crud_class_session.create(db, obj_in=class_session)
        except Exception as e:
            eprint(e)


def populate_quiz_question():
    for quiz_question in quizQuestions:
        try:
            print(f"Populating quiz question: {quiz_question}")
            quiz_question = QuizQuestionCreate(
                question_text=quiz_question["question_text"],
                question_image=quiz_question["question_image"],
                options=quiz_question["options"],
                answer=quiz_question["answer"],
                quiz_id=created_quizzes[quiz_question["quiz_id"]-1],
                marks=quiz_question["marks"],
            )
            crud_question.create(db, obj_in=quiz_question)
        except Exception as e:
            eprint(e)


def populate_quiz_answer():
    for quiz_answer in quizAnswers:
        try:
            print(f"Populating quiz answer: {quiz_answer}")
            quiz_answer = QuizAnswerCreate(
                marks_obtained=quiz_answer["marks_obtained"],
                options_selected=quiz_answer["options_selected"],
                quiz_id=created_quizzes[quiz_answer["quiz_id"]-1],
                student_id=created_users[quiz_answer["student_id"]-1],
            )

            crud_quiz_answer.create(db, obj_in=quiz_answer)
        except Exception as e:
            eprint(e)


def populate_assignment():
    for assignment in assignments:
        try:
            print(f"Populating Assignments: {assignment}")

            instructor=[created_users[i-1] for i in assignment["instructor"]]
            course_id=created_courses[assignment["course_id"]-1]
            group=[created_groups[i-1] for i in assignment["group"]]

            assignment = AssignmentCreate(
                due_date=assignment["due_date"],
                marks=assignment["marks"],
                instructor=instructor,
                group=group,
                course_id=course_id,
                title=assignment["title"],
                contents=assignment["contents"],
            )
            crud_assignment.create(db, obj_in=assignment)
        except Exception as e:
            eprint(e)



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
    populate_assignment()