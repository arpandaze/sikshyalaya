from typing import List
from pydantic import Json
import json

from datetime import datetime


contentAll = [
    {"attributes": {"font": "Roboto"}, "insert": "This is a pre-written test note."},
    {"insert": "\n"},
    {"attributes": {"font": "Roboto"}, "insert": "but"},
    {"insert": "\n"},
    {
        "attributes": {"font": "Roboto"},
        "insert": "this can be modified. [made only for display purpose]",
    },
    {"insert": "\n"},
]

personalNotes: List[Json] = [
    {
        "user_id": 3,
        "tags": ["Maths", "Discrete", "Lattice"],
        "title": "Lattice Structure",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "POSET ? What is it.",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["chemistry", "science", "mathematics"],
        "title": "Boolean Algebra",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Homomorphism vs. Isomorphism",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Diagraph vs Graph Structure",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Binary Operations",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Mathematical Structures",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Verify that a group is Abelian ?",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 3,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Properties of Various Mathematical Structures",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["Maths", "Discrete", "Lattice"],
        "title": "Lattice Structure",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["mathematics", "computer", "physics"],
        "title": "POSET ? What is it.",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["chemistry", "science", "mathematics"],
        "title": "Boolean Algebra",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Homomorphism vs. Isomorphism",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Diagraph vs Graph Structure",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Binary Operations",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Mathematical Structures",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Verify that a group is Abelian ?",
        "content": json.dumps(contentAll),
    },
    {
        "user_id": 2,
        "tags": ["mathematics", "computer", "physics"],
        "title": "Properties of Various Mathematical Structures",
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
