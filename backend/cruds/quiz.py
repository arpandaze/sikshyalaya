from cruds.base import CRUDBase
from schemas.quiz import QuizCreate, QuizUpdate, QuizQuestionCreate, QuizQuestionUpdate
from models.quiz import Quiz, QuizQuestion
from cruds import crud_user, crud_group
from typing import Any, Optional, List
from sqlalchemy.orm import Session


class CRUDQuiz(CRUDBase[Quiz, QuizCreate, QuizUpdate]):
    def create(self, db: Session, *, obj_in: QuizCreate) -> Any:
        if obj_in.instructor:
            instructor = [crud_user.get(db=db, id=id)
                          for id in obj_in.instructor]
        else:
            instructor = []

        if obj_in.group:
            group = [crud_group.get(db=db, id=id) for id in obj_in.group]
        else:
            group = []

        db_obj = Quiz(
            end_time=obj_in.end_time,
            start_time=obj_in.start_time,
            title=obj_in.title,
            description=obj_in.description,
            is_randomized=obj_in.is_randomized,
            display_individual=obj_in.display_individual,
            group=group,
            instructor=instructor,
            course_id=obj_in.course_id,
            total_marks=obj_in.total_marks,
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


crud_quiz = CRUDQuiz(Quiz)


class CRUDQuizQuestion(CRUDBase[QuizQuestion, QuizQuestionCreate, QuizQuestionUpdate]):
    def get_all_by_quiz_id(self, db: Session, *, quiz_id: int) -> List[QuizQuestion]:
        return (
            db.query(self.model)
            .filter(self.model.quiz_id == quiz_id)
            .order_by(self.model.id.asc())
            .all()
        )

    def get_by_quiz_id_question_id(
        self, db: Session, *, quiz_id: int, questionid: int
    ) -> QuizQuestion:
        return (
            db.query(self.model)
            .filter(self.model.quiz_id == quiz_id, self.model.id == questionid)
            .first()
        )


crud_question = CRUDQuizQuestion(QuizQuestion)
