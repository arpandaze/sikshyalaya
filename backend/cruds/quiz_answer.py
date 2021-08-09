from cruds.base import CRUDBase
from schemas import QuizAnswerCreate, QuizAnswerUpdate
from models import QuizAnswer
from sqlalchemy.orm import Session


class CRUDQuizAnswer(CRUDBase[QuizAnswer, QuizAnswerCreate, QuizAnswerUpdate]):
    def get_by_quiz_id(self, db: Session, *, quizId: int, studentId: int):
        return (
            db.query(self.model)
            .filter_by(quiz_id=quizId)
            .filter_by(student_id=studentId)
            .first()
        )

    def get_all_by_quiz_id_as_teacher(self, db: Session, *, quizId: int):
        return db.query(self.model).filter_by(quiz_id=quizId).all()


crud_quiz_answer = CRUDQuizAnswer(QuizAnswer)
