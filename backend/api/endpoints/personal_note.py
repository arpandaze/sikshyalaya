from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils import deps
from cruds import crud_personal_note
from schemas import PersonalNote, PersonalNoteUpdate, PersonalNoteCreate
from models import User
from core import settings
from fastapi import HTTPException

router = APIRouter()


# get personal note:
# student: get only theirs
# teacher: get only theirs
# admin: none
# super admin: all
@router.get("/", response_model=List[PersonalNote])
def get_personal_note(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:

    if not current_user:
        # user not found!
        raise HTTPException(status_code=404, detail="Error ID: 116")

    if current_user.user_type >= settings.UserType.TEACHER.value:
        personal_note_list = []
        personal_notes = current_user.personalnote
        for note in personal_notes:
            personal_note = crud_personal_note.get(db, id=note.id)
            personal_note_list.append(personal_note)
        return personal_note_list

    if current_user.user_type == settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=403,
            detail="Error ID: 117",
        )  # user has no authorization for retrieving personal notes, cause they personal fam!

    if current_user.user_type == settings.UserType.SUPERADMIN.value:
        personal_note = crud_personal_note.get_multi(db, skip=skip, limit=limit)
        return personal_note


# Create new personal note
# student: can create only theirs
# teacher: can create only theirs
# admin: no create previlege
# superadmin: can create all
@router.post("/", response_model=PersonalNote)
def create_personal_note(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: PersonalNoteCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if not current_user:
        # user not found!
        raise HTTPException(status_code=404, detail="Error ID: 119")

    if current_user.user_type >= settings.UserType.TEACHER.value:
        if obj_in.user_id != current_user.id:
            raise HTTPException(
                status_code=403,
                detail="Error ID: 118",
            )  # user has no authorization to create personal note for another user
        else:
            personal_note = crud_personal_note.create(db, obj_in=obj_in)
            return personal_note

    if current_user.user_type == settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=403,
            detail="Error ID: 120",
        )  # user has no authorization to create personal notes

    if current_user.user_type == settings.UserType.SUPERADMIN.value:
        personal_note = crud_personal_note.create(db, obj_in=obj_in)
        return personal_note


# get specific personal note,
# student and teacher can only get that specific note if they own it
# admin can has no permission
# superadmin can get it
@router.get("/{id}/", response_model=PersonalNote)
def get_specific_personal_note(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if not current_user:
        # user not found!
        raise HTTPException(status_code=404, detail="Error ID: 121")

    if current_user.user_type == settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=403,
            detail="Error ID: 122",
        )  # user has no authorization to get personal notes

    if current_user.user_type >= settings.UserType.TEACHER.value:
        personal_notes = get_personal_note(db, current_user=current_user)
        for notes in personal_notes:
            if id == notes.id:
                personal_note = crud_personal_note.get(db, id)
                return personal_note

        raise HTTPException(
            status_code=403,
            detail="Error ID: 123",
        )  # user has no authorization to get other user's personal notes

    if current_user.user_type == settings.UserType.SUPERADMIN.value:
        personal_note = crud_personal_note.get(db, id)
        return personal_note


@router.put("/{id}/", response_model=PersonalNote)
def update_personal_note(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: PersonalNoteUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if not current_user:
        # user not found!
        raise HTTPException(status_code=404, detail="Error ID: 124")

    if current_user.user_type == settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=403,
            detail="Error ID: 125",
        )  # user has no authorization to edit personal notes

    if current_user.user_type >= settings.UserType.TEACHER.value:
        if obj_in.user_id == current_user.id:

            personal_note = crud_personal_note.get(db, id)
            return crud_personal_note.update(db, db_obj=personal_note, obj_in=obj_in)

        else:
            raise HTTPException(
                status_code=403,
                detail="Error ID: 126",
            )  # user has no authorization to get other user's personal notes

    if current_user.user_type == settings.UserType.SUPERADMIN.value:
        personal_note = crud_personal_note.get(db, id)
        return crud_personal_note.update(db, db_obj=personal_note, obj_in=obj_in)


# XXX: For deleting all, is this needed?

# @router.delete("/{}")
# def deletePersonalNotes(
#     db: Session = Depends(deps.get_db),
#     *,
#     current_user: User = Depends(deps.get_current_active_superuser);
# )->Any:
#     crud_personal_note.delete


@router.delete("/{id}/")
def deleteSpecificPersonalNote(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:

    if current_user.user_type == settings.UserType.SUPERADMIN.value:
        personalNote = crud_personal_note.remove(db, id=id)
        return personalNote

    if current_user.user_type == settings.UserType.ADMIN.value:
        raise HTTPException(
            status_code=403,
            detail="Error ID: 142",  # user has no authorization to delete notes of other users
        )

    personalNote = get_specific_personal_note(db, id=id, current_user=current_user)

    personalNote = crud_personal_note.remove(db, id=personalNote.id)

    return personalNote
