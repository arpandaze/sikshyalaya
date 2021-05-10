from cruds.base import CRUDBase
from schemas.quiz import QuizCreate, QuizUpdate, QuizQuestionCreate, QuizQuestionUpdate
from models.quiz import Quiz, QuizQuestion


class CRUDQuiz(CRUDBase[Quiz, QuizCreate, QuizUpdate]):
    pass


crud_quiz = CRUDQuiz(Quiz)


class CRUDQuizQuestion(CRUDBase[QuizQuestion, QuizQuestionCreate, QuizQuestionUpdate]):
    pass


crud_question = CRUDQuizQuestion(QuizQuestion)
