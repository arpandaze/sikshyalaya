import json
import base64

import pytest
import requests
from core.config import settings
import email
from cruds import crud_user
import re



headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
}


def test_post_school(super_user_client):
    data = {"name": "Test School", "address": "Testland"}
    post_req = super_user_client.post(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/",
        json=data,
    )
    assert post_req.status_code == 200, "School post request failed"


def test_get_school(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/",
    )
    assert get_req.status_code == 200

    schools = get_req.json()
    created_school = [
        school
        for school in schools
        if (school.get("name") == "Test School")
        and (school.get("address") == "Testland")
    ]
    assert len(created_school) == 1


def test_get_specific_school(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/",
    )
    assert get_req.status_code == 200

    schools = get_req.json()
    created_school = [
        school
        for school in schools
        if (school.get("name") == "Test School")
        and (school.get("address") == "Testland")
    ]

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/{created_school[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_school_specific = specific_get_req.json()
    assert created_school_specific
    assert created_school_specific.get("name") == "Test School"
    assert created_school_specific.get("address") == "Testland"


def test_put_specific_school(super_user_client):
    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/",
    )
    assert get_req.status_code == 200

    schools = get_req.json()
    created_school = [
        school
        for school in schools
        if (school.get("name") == "Test School")
        and (school.get("address") == "Testland")
    ]

    data = {
        "name": "Updated School",
        "address": "Newland",
    }

    put_req = super_user_client.put(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/{created_school[0]['id']}/",
        json=data,
    )

    assert put_req.status_code == 200

    specific_get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/{created_school[0]['id']}/",
    )

    assert specific_get_req.status_code == 200

    created_school_specific = specific_get_req.json()
    assert created_school_specific
    assert created_school_specific.get("name") == "Updated School"
    assert created_school_specific.get("address") == "Newland"


def test_delete_school(super_user_client, school_id=None):
    if not school_id:
        get_req = super_user_client.get(
            f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/",
        )
        assert get_req.status_code == 200

        schools = get_req.json()
        created_school = [
            school
            for school in schools
            if (school.get("name") == "Updated School")
            and (school.get("address") == "Newland")
        ]

    else:
        created_school = [{"id": school_id}]

    delete_req = super_user_client.delete(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/{created_school[0]['id']}/",
    )

    assert delete_req.status_code == 200

    get_req = super_user_client.get(
        f"{settings.BACKEND_URL_BASE}{settings.API_V1_STR}/school/",
    )
    assert get_req.status_code == 200

    schools = get_req.json()
    filtered_school = [
        school
        for school in schools
        if (school.get("name") == "Updated School")
        and (school.get("address") == "Newland")
    ]
    assert not filtered_school
