from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.config import settings

from models import User
from utils import deps
from cruds import crud_quiz
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


@router.post("/", response_model=QuizCreate)
async def create_quiz(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: QuizCreate,
    current_user: User = Depends(deps.get_current_active_teacher_or_above)
) -> Any:
    quiz = crud_quiz.create(db, obj_in=obj_in)
    return quiz


@router.get("/{id}", response_model=Quiz)
async def get_specific_quiz(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    if current_user.user_type == settings.UserType.STUDENT.value:
        quiz_list = get_quiz(db=db, current_user=current_user)
        for quiz in quiz_list:
            if quiz.quiz_id == id:
                return quiz
        raise HTTPException(
            status_code=401, detail="Error ID: 133"
        )  # not accessible by the Student user

    if current_user.user_type == settings.UserType.TEACHER.value:
        quiz_list = get_quiz(db=db, current_user=current_user)
        for quiz in quiz_list:
            if quiz.quiz_id == id:
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
    current_user: User = Depends(deps.get_current_active_teacher_or_above)
) -> Any:
    quiz = crud_quiz.get(db, id)
    quiz = crud_quiz.update(db, db_obj=quiz, obj_in=obj_in)
    return quiz
