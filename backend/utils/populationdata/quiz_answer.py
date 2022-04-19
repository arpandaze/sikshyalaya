from typing import List
from pydantic import Json

quizAnswers: List[Json] = [
    {
        "student_id": 3,
        "quiz_id": 11,
        "marks_obtained": 20,
        "options_selected": {
            "25": 1,
            "26": 2,
            "27": 0,
            "28": [0, 2, 3],
        },
    },
    {
        "student_id": 2,
        "quiz_id": 11,
        "marks_obtained": 20,
        "options_selected": {
            "25": 1,
            "26": 0,
            "27": 2,
            "28": [0, 2],
        },
    },
    {
        "student_id": 4,
        "quiz_id": 11,
        "marks_obtained": 12,
        "options_selected": {
            "25": 1,
            "26": 0,
            "27": 2,
            "28": [0, 2],
        },
    },
    {
        "student_id": 3,
        "quiz_id": 1,
        "marks_obtained": 32,
        "options_selected": {
            "1": [2, 3],
            "6": 1,
            "15": [1, 4],
            "18": 3,
        },
    },
]
