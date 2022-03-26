from fastapi.encoders import jsonable_encoder
import models

from core.config import settings
from . import test_school


headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
}


def test_post_department(super_user_client, db):
    test_school.test_post_school(super_user_client)
    school_id = (
        db.query(models.School).filter(models.School.name == "Test School").first().id
    )

    data = {"name": "Test Department", "school_id": school_id}
    post_req = super_user_client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/",
        json=data,
    )
    assert post_req.status_code == 200, "Department post request failed"


def test_get_department(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/",
    )
    assert get_req.status_code == 200

    departments = get_req.json()
    created_department = [
        department
        for department in departments
        if (department.get("name") == "Test Department")
    ]
    assert len(created_department) == 1


def test_get_specific_department(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/",
    )
    assert get_req.status_code == 200

    departments = get_req.json()
    created_department = [
        department
        for department in departments
        if (department.get("name") == "Test Department")
    ]

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/{created_department[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_department_specific = specific_get_req.json()
    assert created_department_specific
    assert created_department_specific.get("name") == "Test Department"


def test_put_specific_department(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/",
    )
    assert get_req.status_code == 200

    departments = get_req.json()
    created_department = [
        department
        for department in departments
        if (department.get("name") == "Test Department")
    ]

    data = {
        "name": "Updated Department",
    }

    put_req = super_user_client.put(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/{created_department[0]['id']}/",
        json=data,
    )

    assert put_req.status_code == 200

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/{created_department[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_department_specific = specific_get_req.json()
    assert created_department_specific
    assert created_department_specific.get("name") == "Updated Department"


def test_delete_department(super_user_client, department_id=None):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/",
    )
    assert get_req.status_code == 200

    departments = get_req.json()
    if not department_id:
        created_department = [
            department
            for department in departments
            if (department.get("name") == "Updated Department")
        ]
    else:
        created_department = [
            department
            for department in departments
            if (department.get("id") == department_id)
        ]

    delete_req = super_user_client.delete(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/{created_department[0]['id']}/",
    )

    assert delete_req.status_code == 200

    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/department/",
    )
    assert get_req.status_code == 200

    departments = get_req.json()
    filtered_department = [
        department
        for department in departments
        if (
            department.get("name") == "Updated School"
            or department.get("name") == "Test Department"
        )
    ]
    assert not filtered_department
    test_school.test_delete_school(
        super_user_client, school_id=created_department[0]["school_id"]
    )
