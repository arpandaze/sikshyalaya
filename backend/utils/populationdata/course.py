from typing import List
from pydantic import Json

courses: List[Json] = [
    {
        "course_code": "MCSC201",
        "course_name": "Discrete Structures / Mathematics",
        "course_credit": 3,
        "department_id": 10,
    },
    {
        "course_code": "COMP202",
        "course_name": "Data Structures and Algorithm",
        "course_credit": 3,
        "department_id": 1,
    },
    {
        "course_code": "MATH208",
        "course_name": "Statistics and Probability",
        "course_credit": 3,
        "department_id": 10,
    },
    {
        "course_code": "EEEG211",
        "course_name": "Electronics Engineering I",
        "course_credit": 2,
        "department_id": 3,
    },
    {
        "course_code": "EEEG202",
        "course_name": "Digital Logics and Circuits",
        "course_credit": 2,
        "department_id": 3,
    },
    {
        "course_code": "ENVE101",
        "course_name": "Introduction to Environmental Engineering",
        "course_credit": 2,
        "department_id": 11,
    },
    {
        "course_code": "ENVE201",
        "course_name": "Environmental Engineering Advanced",
        "course_credit": 2,
        "department_id": 11,
    },
    {
        "course_code": "ENGG111",
        "course_name": "Elements of Engineering",
        "course_credit": 2,
        "department_id": 2,
    },
    {
        "course_code": "ENGG211",
        "course_name": "Advanced Engineering",
        "course_credit": 2,
        "department_id": 2,
    },
    {
        "course_code": "LLB101",
        "course_name": "Basics of Law",
        "course_credit": 3,
        "department_id": 4,
    },
    {
        "course_code": "LLB202",
        "course_name": "Criminal Law",
        "course_credit": 4,
        "department_id": 4,
    },
    {
        "course_code": "IST101",
        "course_name": "Basic Information Systems and Tecnology",
        "course_credit": 2,
        "department_id": 5,
    },
    {
        "course_code": "BMS222",
        "course_name": "Advanced Business and Management Studies",
        "course_credit": 3,
        "department_id": 5,
    },
    {
        "course_code": "ORTH321",
        "course_name": "Orthology",
        "course_credit": 4,
        "department_id": 6,
    },
    {
        "course_code": "RAD298",
        "course_name": "Radiology [indepth]",
        "course_credit": 5,
        "department_id": 6,
    },
    {
        "course_code": "MUSC101",
        "course_name": "Introduction to Music Theory",
        "course_credit": 2,
        "department_id": 7,
    },
    {
        "course_code": "MUSC234",
        "course_name": "Music Theory II [indepth]",
        "course_credit": 4,
        "department_id": 7,
    },
    {
        "course_code": "LIT101",
        "course_name": "Eduction in Literature I [basic]",
        "course_credit": 2,
        "department_id": 8,
    },
    {
        "course_code": "LIT234",
        "course_name": "Literature II [indepth]",
        "course_credit": 4,
        "department_id": 8,
    },
]
