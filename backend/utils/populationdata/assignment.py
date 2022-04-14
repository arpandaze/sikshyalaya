from typing import List
from pydantic import Json

from datetime import datetime, timedelta

assignments: List[Json] = [
    {
    "due_date":datetime.utcnow() + timedelta(hours=4),
    "marks": 10,
    "title": "Assignment on Mathematical Structures",
    "contents": "Complete the assignment looking at the following questions.",
    "instructor": [10, 9],
    "group": [3,1],
    "course_id": 1,
    },
    {
    "due_date":datetime(2021, 8, 20, 14, 00, 00),
    "marks": 20,
    "title": "Assignment on Environmental Sustainability",
    "contents": "Complete the assignment looking at the following questions.",
    "instructor":[8, 9],
    "group": [3,1,2],
    "course_id": 3,
    },
    {
    "due_date":datetime.utcnow() + timedelta(hours=-4),
    "marks": 30,
    "title": "Assignment on  Time Complexity of Algorithms",
    "contents": "Descirbe the time complexity of the following algorithms: Merge Sort and Bubble Sort",
    "instructor":[8],
    "group": [3,1,2],
    "course_id": 2,
    },
    {
    "due_date":datetime(2022, 5, 10, 14, 00, 00),
    "marks": 10,
    "title": "Assignment on  Green Energy",
    "contents": "Discuss Green Energy and its Principles indepth.",
    "instructor":[8],
    "group": [3,1],
    "course_id": 4,
    },{
    "due_date":datetime(2022, 5, 11, 14, 00, 00),
    "marks": 10,
    "title": "Assignment on Environmental Sustainability",
    "contents": "What do you mean by environmental sustainability.",
    "instructor":[9,10],
    "group": [3,1,2],
    "course_id": 3,
    },
    {
    "due_date":datetime(2022, 5, 12, 14, 00, 00),
    "marks": 100,
    "title": "Assignment on Database",
    "contents": "Prepare a detailed paper on the Fundamentals of Normalization and the need for it.",
    "instructor": [8],
    "group": [3,1,2],
    "course_id": 2,
    },
    {
    "due_date":datetime(2022, 5, 12, 14, 00, 00),
    "marks": 15,
    "title": "Assignment on Business",
    "contents": "Discuss the dos and donts of getting started with business.",
    "instructor": [9],
    "group": [3,1,7],
    "course_id": 10,
    },
    {
    "due_date":datetime(2021, 5, 12, 14, 00, 00),
    "marks": 15,
    "title": "Criminal Law Assignment",
    "contents": "Criminal Law: What is it, and What are the current trails are proceeding under the offence listed in it.",
    "instructor": [8,9,10],
    "group": [3,1,9,2],
    "course_id": 8,
    },
]
