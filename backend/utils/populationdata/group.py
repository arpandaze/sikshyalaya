from typing import List
from pydantic import Json

groups: List[Json] = [
    {
        "program_id": "1",
        "sem": 2,
        "course": [1, 3],
    },
    {
        "program_id": "1",
        "sem": 3,
        "course": [2, 4],
    },
    {
        "program_id": "2",
        "sem": 1,
        "course": [1, 3],
    },
    {
        "program_id": "3",
        "sem": 2,
        "course": [5, 6],
    },
    {
        "program_id": "4",
        "sem": 1,
        "course": [1, 3],
    },
    {
        "program_id": "5",
        "sem": 4,
        "course": [1, 3, 4],
    },
    {
        "program_id": "6",
        "sem": 2,
        "course": [9, 10],
    },
    {
        "program_id": "7",
        "sem": 3,
        "course": [9, 10],
    },
    {
        "program_id": "8",
        "sem": 5,
        "course": [7, 8],
    },
    {
        "program_id": "9",
        "sem": 6,
        "course": [11, 12],
    },
    {
        "program_id": "11",
        "sem": 8,
        "course": [12],
    },
    {
        "program_id": "12",
        "sem": 4,
        "course": [13, 14],
    },
    {
        "program_id": "13",
        "sem": 5,
        "course": [13, 14],
    },
    {
        "program_id": "17",
        "sem": 4,
        "course": [15, 16],
    },
    {
        "program_id": "18",
        "sem": 3,
        "course": [15, 16],
    },
    {
        "program_id": "14",
        "sem": 3,
        "course": [2],
    },
    {
        "program_id": "15",
        "sem": 3,
        "course": [4],
    },
]
