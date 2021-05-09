from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_quiz
from schemas import quiz, quizUpdate, quizCreate

router = APIRouter()


@router.get("/quiz", response_model=List[quiz])
async def get_quiz(
    db: Session = Depends(deps.get_db), skip: int = 0, limit: int = 100
) -> Any:
    quiz = crud_quiz.get_multi(db, skip=skip, limit=limit)
    return quiz


@router.post("/quiz", response_model=quiz)
async def create_quiz(
    db: Session = Depends(deps.get_db), *, obj_in: quizCreate
) -> Any:
    quiz = crud_quiz.create(db, obj_in=obj_in)
    return quiz


@router.get("/quiz/{id}", response_model=quiz)
async def get_specific_quiz(db: Session = Depends(deps.get_db), *, id: int) -> Any:
    quiz = crud_quiz.get(db, id)
    return quiz


@router.put("/quiz/{id}", response_model=quiz)
async def update_quiz(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: quizUpdate
) -> Any:
    quiz = crud_quiz.get(db, id)
    quiz = crud_quiz.update(db, db_obj=quiz, obj_in=obj_in)
    return quiz
