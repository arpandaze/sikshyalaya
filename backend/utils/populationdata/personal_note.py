from typing import List
from pydantic import Json
import json

from datetime import datetime


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
        "last_updated_time": datetime(2021, 6, 12, 11, 00, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "titleTwo",
        "last_updated_time": datetime(2021, 7, 12, 12, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 4,
        "tags": ["Chemistry", "Science", "Pharma"],
        "title": "titleThree",
        "last_updated_time": datetime(2021, 8, 12, 13, 00, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 5,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Four",
        "last_updated_time": datetime(2019, 3, 12, 9, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 6,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Five",
        "last_updated_time": datetime(2021, 7, 12, 9, 40, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 7,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Six",
        "last_updated_time": datetime(2021, 3, 12, 19, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 8,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title seven",
        "last_updated_time": datetime(2021, 1, 12, 9, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 9,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title eight",
        "last_updated_time": datetime(2021, 10, 12, 19, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 10,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Nine",
        "last_updated_time": datetime(2021, 9, 12, 18, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 4,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title ten",
        "last_updated_time": datetime(2021, 3, 12, 9, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 5,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title eleven",
        "last_updated_time": datetime(2021, 10, 11, 19, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 7,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title twelve",
        "last_updated_time": datetime(2021, 3, 30, 12, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 8,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title thirteen",
        "last_updated_time": datetime(2021, 6, 4, 9, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title fourteen",
        "last_updated_time": datetime(2021, 3, 2, 9, 30, 00),
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 9,
        "tags": ["mathematics", "computer", "physics"],
        "title": "title Fifteen",
        "last_updated_time": datetime(2021, 1, 8, 14, 30, 00),
        "content": json.dumps(contentAll),
    },
]
