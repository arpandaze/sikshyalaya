from cruds.base import CRUDBase
from schemas.quiz import QuizCreate, QuizUpdate
from models.quiz import Quiz


class CRUDQuiz(CRUDBase[Quiz, QuizCreate, QuizUpdate]):
    pass


crud_quiz = CRUDQuiz(Quiz)
