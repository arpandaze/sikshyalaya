from cruds.base import CRUDBase
from schemas import QuizAnswerCreate, QuizAnswerUpdate
from models import QuizAnswer


class CRUDQuizAnswer(CRUDBase[QuizAnswer, QuizAnswerCreate, QuizAnswerUpdate]):
    pass


crud_quiz_answer = CRUDQuizAnswer(QuizAnswer)
