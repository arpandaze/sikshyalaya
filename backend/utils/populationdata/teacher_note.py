from typing import List
from pydantic import Json

teacherNotes: List[Json] = [
    {
        "user_id": 8,
        "student_id": 4,
        "message": "Is attentive, but weak."
    },
    {
        "user_id": 9,
        "student_id": 3,
        "message": "Negligent of the topic being taught."
    },
    {
        "user_id": 10,
        "student_id": 6,
        "message": "Could perform better, has potential. Practice will do the trick."
    },
    {
        "user_id": 8,
        "student_id": 5,
        "message": "Absolutely Brilliant."
    },
    {
        "user_id": 9,
        "student_id": 5,
        "message": "Is attentive, but weak."
    },
    {
        "user_id": 10,
        "student_id": 3,
        "message": "Absolutely Brilliant."
    },
    {
        "user_id": 9,
        "student_id": 7,
        "message": "Absolutely Brilliant."
    },
]
