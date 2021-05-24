from typing import List
from pydantic import Json
import json


contentAll = [
    {"attributes": {"font": "Roboto"}, "insert": "Rushab is a very good boy"},
    {"insert": "\n"},
    {"attributes": {"font": "Roboto"}, "insert": "but"},
    {"insert": "\n"},
    {"attributes": {"font": "Roboto"}, "insert": "Yugesh isn't"},
    {"insert": "\n"},
]

personalNotes: List[Json] = [
    {
        "user_id": 3,
        "tags": ["Maths", "Computer", "Chemistry"],
        "title": "titleOne",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "titleTwo",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 4,
        "tags": ["Chemistry", "Science", "Pharma"],
        "title": "titleThree",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 5,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Four",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 6,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Five",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 7,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Six",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 8,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title seven",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 9,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title eight",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 10,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Nine",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 4,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title ten",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 5,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title eleven",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 7,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title twelve",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 8,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title thirteen",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title fourteen",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 9,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Fifteen",
        "content": json.dumps(contentAll),
    },
]
