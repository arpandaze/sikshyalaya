import math
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User
from utils import deps
from datetime import datetime, timedelta
from cruds import crud_quiz_answer, crud_question, crud_quiz
from schemas import (
    QuizAnswer,
    QuizAnswerCreate,
    QuizAnswerUpdate,
    QuizAnsweronlySelected,
    QuizAnswerwithName,
)

from typing import Any, Optional, List, Dict  # noqa


router = APIRouter()


@router.get("/")
async def get_answers(
    db: Session = Depends(deps.get_db),
    *,
    current_user: User = Depends(deps.get_current_active_user),
):
    pass


@router.get("/{quizid}", response_model=QuizAnswer, response_model_exclude_none=True)
async def get_answers_quiz(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    current_user: User = Depends(deps.get_current_active_user),
):
    answer = crud_quiz_answer.get_by_quiz_id(
        db=db, quizId=quizid, studentId=current_user.id
    )

    if answer:
        marks = answer.marks_obtained
        answer.marks_obtained = None

        quiz = crud_quiz.get(db=db, id=quizid)

        if (
            quiz
            and quiz.end_time
            and quiz.end_time <= (datetime.utcnow() - timedelta(seconds=15))
        ):
            answer.marks_obtained = marks

        return answer

    raise HTTPException(status_code=404, detail="Error ID: 144")


@router.get("/{quizid}/getAnswersAsTeacher/", response_model=List[QuizAnswerwithName])
async def get_quiz_answers_as_teacher(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
):
    if current_user.quiz:
        for quiz in current_user.quiz:
            if quiz.id == quizid:
                answers = crud_quiz_answer.get_all_by_quiz_id_as_teacher(
                    db=db, quizId=quizid
                )
                if len(answers) >= 1:
                    return answers

    raise HTTPException(
        status_code=404,
        detail="Error ID: 143",  # could not populate answer
    )


@router.get("/{quizid}/exists/")
async def check_existence(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    current_user: User = Depends(deps.get_current_active_user),
):
    answer = crud_quiz_answer.get_by_quiz_id(
        db=db, quizId=quizid, studentId=current_user.id
    )
    if not answer:
        return {"exists": False}
    else:
        return {"exists": True}


@router.get("/{id}")
async def get_specific_answer():
    pass


@router.post("/{quiz_id}", response_model=QuizAnsweronlySelected)
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
                if len(question.answer) >= len(questionOption):
                    for answer in questionOption:
                        if answer in question.answer:
                            correctCount = correctCount + 1

                    correctCount = correctCount / len(question.answer)

            else:
                questionAnswer[question.id] = questionOption

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

    try:
        questionAnswer = crud_quiz_answer.create(db, obj_in=questionAnswer)
        return questionAnswer
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Error ID: 142",  # could not populate answer
        )
