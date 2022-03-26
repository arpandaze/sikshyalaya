from core.config import settings
from api.endpoints.course import create_course
from tests.api.api_v1 import test_department
from fastapi.encoders import jsonable_encoder
import models

from . import test_department


headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
}


def test_post_course(super_user_client, db):
    test_department.test_post_department(super_user_client, db)
    department_id = (
        db.query(models.Department)
        .filter(models.Department.name == "Test Department")
        .first()
        .id
    )

    data = {
        "course_code": "TEST101",
        "course_name": "Test Course",
        "course_credit": 3,
        "department_id": department_id,
    }

    post_req = super_user_client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/",
        json=data,
    )
    assert post_req.status_code == 200, "Course post request failed"


def test_get_course(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/",
    )
    assert get_req.status_code == 200

    courses = get_req.json()
    print(courses)
    created_course = [
        course for course in courses if (course.get("course_name") == "Test Course")
    ]
    assert len(created_course) == 1


def test_get_specific_course(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/",
    )
    assert get_req.status_code == 200

    courses = get_req.json()
    created_course = [
        course for course in courses if (course.get("course_name") == "Test Course")
    ]

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/{created_course[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_course_specific = specific_get_req.json()
    assert created_course_specific
    assert created_course_specific.get("course_name") == "Test Course"


def test_put_specific_course(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/",
    )
    assert get_req.status_code == 200

    courses = get_req.json()
    created_course = [
        course for course in courses if (course.get("course_name") == "Test Course")
    ]

    data = {
        "course_name": "Updated Course",
        "course_code": "TEST102",
        "course_credit": 2,
    }

    put_req = super_user_client.put(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/{created_course[0]['id']}/",
        json=data,
    )

    assert put_req.status_code == 200

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/{created_course[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_course_specific = specific_get_req.json()
    assert created_course_specific
    assert created_course_specific.get("course_name") == "Updated Course"
    assert created_course_specific.get("course_code") == "TEST102"
    assert created_course_specific.get("course_credit") == 2


def test_delete_course(super_user_client, course_id=None):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/",
    )
    assert get_req.status_code == 200

    courses = get_req.json()
    if not course_id:
        created_course = [
            course
            for course in courses
            if (course.get("course_name") == "Updated Course")
        ]
    else:
        created_course = [
            course for course in courses if (course.get("id") == course_id)
        ]

    delete_req = super_user_client.delete(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/{created_course[0]['id']}/",
    )

    assert delete_req.status_code == 200

    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/course/",
    )
    assert get_req.status_code == 200

    courses = get_req.json()
    filtered_courses = [
        course
        for course in courses
        if (
            course.get("name") == "Updated Course"
            or course.get("course_name") == "Test Course"
        )
    ]
    assert not filtered_courses
    test_department.test_delete_department(
        super_user_client, department_id=created_course[0]["department_id"]
    )
