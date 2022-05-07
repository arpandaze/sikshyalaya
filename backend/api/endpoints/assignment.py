from locale import currency
from typing import Any, List

from hashlib import sha1
import os
import shutil

from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from core.config import settings

from models import User

import aiofiles

from utils import deps
from cruds import crud_assignment, crud_group, crud_assignment_upload
from schemas import Assignment, AssignmentUpdate, AssignmentCreate

router = APIRouter()

ASSIGNMENT_ROUTE: str = "assignments"


@router.get("/", response_model=List[Assignment])
async def get_assignment(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = -1,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:

    if current_user.user_type == settings.UserType.STUDENT.value:
        group = crud_group.get(db, id=current_user.group_id)
        assignment = crud_assignment.get_quiz_by_group_id(db=db, group=group)
        index = 0
        for assig in assignment:
            assignmentUpload = crud_assignment_upload.get_by_assignment_id(
                db=db,
                assignmentId=assig.id,
                studentId=current_user.id,
            )

            if assignmentUpload:
                assignment[index].exists = True
            else:
                assignment[index].exists = False
            index += 1

        return assignment

    if current_user.user_type == settings.UserType.TEACHER.value:
        return crud_assignment.get_quiz_by_instructor_id(db=db, user=current_user)

    if current_user.user_type <= settings.UserType.ADMIN.value:
        return crud_assignment.get_multi(db, skip=skip, limit=limit)


@router.post("/", response_model=Assignment)
async def create_assignment(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: AssignmentCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:

    if obj_in.instructor:
        if current_user.id not in obj_in.instructor:
            obj_in.instructor.append(current_user.id)
    else:
        obj_in.instructor = [current_user.id]

    assignment = crud_assignment.create(db, obj_in=obj_in)
    return assignment


@router.post("/{id}/files/")
async def post_files(
    db: Session = Depends(deps.get_db),
    files: List[UploadFile] = File(...),
    current_user=Depends(deps.get_current_active_teacher_or_above),
    *,
    id: int,
):

    assignment = crud_assignment.get(db=db, id=id)

    hashedAssignmentId = sha1(str(id).encode(encoding="UTF-8", errors="strict"))

    FILE_ASSIGNMENT_PATH = os.path.join(
        ASSIGNMENT_ROUTE,
        hashedAssignmentId.hexdigest(),
    )

    FILE_PATH = os.path.join(
        settings.UPLOAD_DIR_ROOT,
        FILE_ASSIGNMENT_PATH,
    )

    if not os.path.exists(FILE_PATH):
        os.makedirs(FILE_PATH)

    if assignment.files:
        assignmentFiles = assignment.files.copy()
        fileIndex = len(assignment.files)
    else:
        assignmentFiles = []
        fileIndex = 0

    for file in files:
        fileName, fileExtension = os.path.splitext(file.filename)
        hashedFileName = sha1(
            (fileName + str(fileIndex)).encode(encoding="UTF-8", errors="strict")
        )
        fileIndex = fileIndex + 1
        filename = f"{FILE_PATH}/{hashedFileName.hexdigest()}{fileExtension}"
        async with aiofiles.open(filename, mode="wb") as f:
            content = await file.read()
            await f.write(content)
        assignmentFiles.append(
            {
                "path": f"{FILE_ASSIGNMENT_PATH}/{hashedFileName.hexdigest()}{fileExtension}",
                "name": file.filename,
            }
        )

    obj_in = AssignmentUpdate(files=assignmentFiles)
    updated = crud_assignment.update(db=db, db_obj=assignment, obj_in=obj_in)

    return updated


@router.get("/{id}/", response_model=Assignment)
async def get_specific_assignment(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    *,
    id: int,
) -> Any:

    assignments = await get_assignment(db=db, current_user=current_user)

    if assignments:
        for assignment in assignments:
            if assignment.id == id:
                return assignment


@router.delete("/{id}/")
async def delete_assignment(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
    *,
    id: int,
) -> Any:
    assignment = await get_specific_assignment(db=db, current_user=current_user, id=id)

    if not assignment:
        return {"msg": "assignment not found"}

    deleted = crud_assignment.remove(db=db, id=assignment.id)
    if deleted:
        hashedAssignmentId = sha1(
            str(assignment.id).encode(encoding="UTF-8", errors="strict")
        )
        FILE_ASSIGNMENT_PATH = os.path.join(
            ASSIGNMENT_ROUTE,
            hashedAssignmentId.hexdigest(),
        )

        FILE_PATH = os.path.join(
            settings.UPLOAD_DIR_ROOT,
            FILE_ASSIGNMENT_PATH,
        )

        if os.path.exists(FILE_PATH):
            shutil.rmtree(FILE_PATH)

        return {"msg": "delete success"}


@router.put("/{id}", response_model=Assignment)
async def update_assignment(
    db: Session = Depends(deps.get_db), *, id: int, obj_in: AssignmentUpdate
) -> Any:
    assignment = crud_assignment.get(db, id)
    assignment = crud_assignment.update(db, db_obj=assignment, obj_in=obj_in)
    return assignment
