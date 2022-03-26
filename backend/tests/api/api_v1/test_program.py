from fastapi.encoders import jsonable_encoder
import models

from core.config import settings
from . import test_department


headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
}


def test_post_program(super_user_client, db):
    test_department.test_post_department(super_user_client, db)
    department_id = (
        db.query(models.Department)
        .filter(models.Department.name == "Test Department")
        .first()
        .id
    )

    data = {"name": "Test Program", "department_id": department_id, "max_sems": 8}
    post_req = super_user_client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/",
        json=data,
    )
    assert post_req.status_code == 200, "Program post request failed"


def test_get_program(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/",
    )
    assert get_req.status_code == 200

    programs = get_req.json()
    created_program = [
        program for program in programs if (program.get("name") == "Test Program")
    ]
    assert len(created_program) == 1


def test_get_specific_program(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/",
    )
    assert get_req.status_code == 200

    programs = get_req.json()
    created_program = [
        program for program in programs if (program.get("name") == "Test Program")
    ]

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/{created_program[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_program_specific = specific_get_req.json()
    assert created_program_specific
    assert created_program_specific.get("name") == "Test Program"


def test_put_specific_program(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/",
    )
    assert get_req.status_code == 200

    programs = get_req.json()
    created_program = [
        program for program in programs if (program.get("name") == "Test Program")
    ]

    data = {
        "name": "Updated Program",
    }

    put_req = super_user_client.put(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/{created_program[0]['id']}/",
        json=data,
    )

    assert put_req.status_code == 200

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/{created_program[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_program_specific = specific_get_req.json()
    assert created_program_specific
    assert created_program_specific.get("name") == "Updated Program"


def test_delete_program(super_user_client, program_id=None):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/",
    )
    assert get_req.status_code == 200

    programs = get_req.json()
    if not program_id:
        created_program = [
            program
            for program in programs
            if (program.get("name") == "Updated Program")
        ]
    else:
        created_program = [
            program for program in programs if (program.get("id") == program_id)
        ]

    delete_req = super_user_client.delete(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/{created_program[0]['id']}/",
    )

    assert delete_req.status_code == 200

    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/program/",
    )
    assert get_req.status_code == 200

    programs = get_req.json()
    filtered_program = [
        program
        for program in programs
        if (
            program.get("name") == "Updated Program"
            or program.get("name") == "Test Program"
        )
    ]
    print(filtered_program)
    assert not filtered_program
    test_department.test_delete_department(
        super_user_client, department_id=created_program[0]["department_id"]
    )
