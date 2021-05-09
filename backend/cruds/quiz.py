from crud.base import CRUDBase
from schemas.quiz import quizCreate, quizUpdate
from models.quiz import quiz


class CRUDquiz(CRUDBase[quiz, quizCreate, quizUpdate]):
    pass


crud_quiz = CRUDquiz(quiz)
