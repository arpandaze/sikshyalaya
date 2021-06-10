from typing import List
from pydantic import Json

programs: List[Json] = [
    {"name": "Computer Science", "max_sems": 8, "department_id": 1},
    {"name": "Computer Engineering", "max_sems": 8, "department_id": 1},
    {"name": "Mechanical Engineering", "max_sems": 8, "department_id": 2},
    {"name": "Enivironmental Science", "max_sems": 8, "department_id": 3},
    {"name": "Environmental Engineering", "max_sems": 8, "department_id": 3},
    {"name": "Information System", "max_sems": 8, "department_id": 4},
    {"name": "Business Administration", "max_sems": 8, "department_id": 4},
    {"name": "Legislative Law", "max_sems": 8, "department_id": 5},
    {"name": "Medicine", "max_sems": 8, "department_id": 6},
    {"name": "Dental Surgery", "max_sems": 8, "department_id": 6},
    {"name": "Science in Nursing", "max_sems": 8, "department_id": 6},
    {"name": "Music Education", "max_sems": 8, "department_id": 7},
    {"name": "Arts in Music", "max_sems": 8, "department_id": 7},
    {"name": "Fine Arts", "max_sems": 8, "department_id": 8},
    {"name": "Culture and Arts", "max_sems": 8, "department_id": 8},
    {"name": "Photography", "max_sems": 8, "department_id": 8},
    {"name": "Education Studies", "max_sems": 8, "department_id": 9},
    {"name": "English Literature", "max_sems": 8, "department_id": 9},
]
