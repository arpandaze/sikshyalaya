from typing import Any, List

from random import randint

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.config import settings

from models import User
from utils import deps
from cruds import crud_quiz, crud_question
from schemas import (
    Quiz,
    QuizCreate,
    QuizUpdate,
    QuizAnswer,
    QuizAnswerCreate,
    QuizAnswerUpdate,
    QuizQuestion,
    QuizQuestionCreate,
    QuizQuestionUpdate,
)

router = APIRouter()


@router.get("/", response_model=List[Quiz])
async def get_quiz(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    quiz = crud_quiz.get_multi(db, skip=skip, limit=limit)

    if current_user.user_type == settings.UserType.STUDENT.value:

        quiz_list = []
        for itemQuiz in quiz:
            quizSessions = itemQuiz.session
            for quizSession in quizSessions:
                quizGroup = quizSession.group_id
                if current_user.group_id == quizGroup:
                    quiz_list.append(itemQuiz)

        return quiz_list

    if current_user.user_type == settings.UserType.TEACHER.value:

        quiz_list = []
        for itemQuiz in quiz:
            quizSessions = itemQuiz.session
            userSessions = current_user.class_session
            for quizSession in quizSessions:
                if quizSession in userSessions:
                    quiz_list.append(itemQuiz)

        return quiz_list

    if current_user.user_type <= settings.UserType.ADMIN.value:
        return quiz


# XXX Process of adding a quiz:
#  create a quiz,
# then get the quiz by name,
# then assign that to a class session, if that class session does not have a quiz_id.
@router.post("/", response_model=QuizCreate)
async def create_quiz(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: QuizCreate,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
) -> Any:
    quiz = crud_quiz.create(db, obj_in=obj_in)
    return quiz


# FIXME: complete this, is incomplete
@router.get("/questions", response_model=List[QuizQuestion])
async def get_question(
    db: Session = Depends(deps.get_db),
    *,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    print("hello")
    questions = crud_question.get_multi(db, skip=skip, limit=limit)
    # quiz = get_quiz(db, current_user=current_user)
    # for question in questions:
    #     for specificQuiz in quiz:
    # print(f"{quiz.id}[2]")
    return questions


@router.get("/{id}", response_model=Quiz)
async def get_specific_quiz(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.user_type == settings.UserType.STUDENT.value:
        quiz_list = await get_quiz(db=db, current_user=current_user)
        for quiz in quiz_list:
            if quiz.id == id:
                return quiz
        raise HTTPException(
            status_code=401, detail="Error ID: 133"
        )  # not accessible by the Student user

    if current_user.user_type == settings.UserType.TEACHER.value:
        quiz_list = await get_quiz(db=db, current_user=current_user)
        for quiz in quiz_list:
            if quiz.id == id:
                return quiz
        raise HTTPException(
            status_code=401, detail="Error ID: 134"
        )  # not accessible by the Teacher user

    if current_user.user_type <= settings.UserType.ADMIN.value:
        quiz = crud_quiz.get(db, id)
        return quiz


@router.put("/{id}", response_model=QuizUpdate)
async def update_quiz(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: QuizUpdate,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
) -> Any:
    quiz = crud_quiz.get(db, id)
    quiz = crud_quiz.update(db, db_obj=quiz, obj_in=obj_in)
    return quiz
