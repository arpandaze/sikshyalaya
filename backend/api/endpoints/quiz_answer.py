import math
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User
from utils import deps
from cruds import crud_quiz_answer, crud_question
from schemas import (
    QuizAnswer,
    QuizAnswerCreate,
    QuizAnswerUpdate,
)

from typing import Any, Optional, List, Dict  # noqa


router = APIRouter()


@router.get("/")
async def get_answers(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    questionAnswer: QuizAnswer,
    current_user: User = Depends(deps.get_current_active_user),
):
    pass


@router.get("/{quizid}")
async def get_answers_quiz():
    pass


@router.get("/{id}")
async def get_specific_answer():
    pass


@router.post("/{quiz_id}")
async def submit_answer(
    db: Session = Depends(deps.get_db),
    *,
    questionAnswer: Dict[int, Any],
    quiz_id: int,
    current_user: User = Depends(deps.get_current_active_user),
):
    questions = crud_question.get_all_by_quiz_id(db, quiz_id=quiz_id)

    marksObtained = 0
    correctCount = 0
    for question in questions:
        if question.id in questionAnswer.keys():
            questionOption = questionAnswer[question.id]
            if question.multiple:
                for answer in questionOption:
                    if answer in question.answer:
                        correctCount = correctCount + 1

                correctCount = correctCount / len(question.answer)

            else:
                questionAnswer[question.id] = [questionOption]

                if questionOption == question.answer[0]:
                    correctCount = 1

            marksObtained = marksObtained + correctCount * question.marks
            correctCount = 0

    questionAnswer = QuizAnswerCreate(
        marks_obtained=math.ceil(marksObtained),
        options_selected=questionAnswer,
        quiz_id=quiz_id,
        student_id=current_user.id,
    )

    questionAnswer = crud_quiz_answer.create(db, obj_in=questionAnswer)
    return questionAnswer
