import math
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from models import User
from utils import deps
from datetime import datetime, timedelta
from cruds import crud_assignment_upload, crud_assignment
from schemas import (
    AssignmentUpload,
    AssignmentUploadCreate,
    AssignmentUploadUpdate,
    AssignmentUploadwithName,
)
import os
from fastapi.responses import FileResponse
from hashlib import sha1

import aiofiles

import shutil

from typing import Any, Optional, List, Dict  # noqa
from core.config import settings


router = APIRouter()

assignment_upload_ROUTE: str = "assignmentUpload"


@router.get("/")
async def get_assignments(
    db: Session = Depends(deps.get_db),
    *,
    current_user: User = Depends(deps.get_current_active_user),
):
    pass


@router.get("/{assignmentid}", response_model=AssignmentUpload)
async def get_assignment_upload(
    db: Session = Depends(deps.get_db),
    *,
    assignmentid: int,
    current_user: User = Depends(deps.get_current_active_user),
):

    assignmentUpload = crud_assignment_upload.get_by_assignment_id(
        db=db, assignmentId=assignmentid, studentId=current_user.id
    )

    if assignmentUpload:
        return assignmentUpload

    raise HTTPException(status_code=404, detail="Error ID: 147")


@router.get(
    "/{assignmentid}/getUploadsAsTeacher", response_model=List[AssignmentUploadwithName]
)
async def get_assignment_upload_as_teacher(
    db: Session = Depends(deps.get_db),
    *,
    assignmentid: int,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
):
    if current_user.assignments:
        for assignment in current_user.assignments:
            if assignment.id == assignmentid:
                assignmentUpload = (
                    crud_assignment_upload.get_all_by_assignment_id_as_teacher(
                        db=db, assignmentId=assignmentid
                    )
                )
                if assignmentUpload:
                    return assignmentUpload

    raise HTTPException(
        status_code=404,
        detail="Error ID: 148",  # could not populate answer
    )


@router.get("/{assignmentid}/exists")
async def check_existence(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    *,
    assignmentid: int,
):
    assignmentUpload = crud_assignment_upload.get_by_assignment_id(
        db=db, assignmentId=assignmentid, studentId=current_user.id
    )

    if not assignmentUpload:
        return {"exists": False}
    else:
        return {"exists": True}


@router.post("/{assignmentid}/upload")
async def post_files(
    db: Session = Depends(deps.get_db),
    files: List[UploadFile] = File(...),
    current_user=Depends(deps.get_current_active_user),
    *,
    assignmentid: int,
):

    hashedAssignmentId = sha1(
        str(assignmentid).encode(encoding="UTF-8", errors="strict")
    )
    hashedUserId = sha1(str(current_user.id).encode(encoding="UTF-8", errors="strict"))

    FILE_ASSIGNMENT_PATH = os.path.join(
        assignment_upload_ROUTE,
        hashedUserId.hexdigest(),
        hashedAssignmentId.hexdigest(),
    )

    FILE_PATH = os.path.join(
        settings.UPLOAD_DIR_ROOT,
        FILE_ASSIGNMENT_PATH,
    )

    if os.path.exists(FILE_PATH):
        shutil.rmtree(FILE_PATH)

    if not os.path.exists(FILE_PATH):
        os.makedirs(FILE_PATH)

    fileIndex = 0
    assignmentFiles = []

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

    assignmentUpload = crud_assignment_upload.get_by_assignment_id(
        db=db, assignmentId=assignmentid, studentId=current_user.id
    )

    if assignmentUpload:
        db_obj = assignmentUpload
        obj_in = AssignmentUploadUpdate(
            files=assignmentFiles,
            submission_date=datetime.utcnow(),
            marks_obtained=None,
        )
        assignmentUploadX = crud_assignment_upload.update(
            db=db, db_obj=db_obj, obj_in=obj_in
        )
    else:
        obj_in = AssignmentUploadCreate(
            files=assignmentFiles,
            assignment_id=assignmentid,
            student_id=current_user.id,
            submission_date=datetime.utcnow(),
            marks_obtained=None,
        )
        assignmentUploadX = crud_assignment_upload.create(db=db, obj_in=obj_in)

    return assignmentUploadX


@router.delete("/{assignmentid}/files")
async def post_files(
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_active_user),
    *,
    assignmentid: int,
):

    hashedAssignmentId = sha1(
        str(assignmentid).encode(encoding="UTF-8", errors="strict")
    )
    hashedUserId = sha1(str(current_user.id).encode(encoding="UTF-8", errors="strict"))

    FILE_ASSIGNMENT_PATH = os.path.join(
        assignment_upload_ROUTE,
        hashedUserId.hexdigest(),
        hashedAssignmentId.hexdigest(),
    )

    FILE_PATH = os.path.join(
        settings.UPLOAD_DIR_ROOT,
        FILE_ASSIGNMENT_PATH,
    )

    if os.path.exists(FILE_PATH):
        shutil.rmtree(FILE_PATH)

    assignmentUpload = crud_assignment_upload.get_by_assignment_id(
        db=db, assignmentId=assignmentid, studentId=current_user.id
    )

    if assignmentUpload:
        crud_assignment_upload.remove(db=db, id=assignmentUpload.id)
        return {"message": "Success"}

    raise HTTPException(status_code=404, detail="Error ID: 149")


@router.post("/{assignmentuploadid}/mark")
async def post_files(
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_active_teacher_or_above),
    *,
    assignmentuploadid: int,
    marks_obtained: int,
):

    assignmentUpload = crud_assignment_upload.get(db=db, id=assignmentuploadid)

    if assignmentUpload:
        obj_in = AssignmentUploadUpdate(marks_obtained=marks_obtained)
        db_obj = assignmentUpload
        updated = crud_assignment_upload.update(db=db, db_obj=db_obj, obj_in=obj_in)

        return updated

    raise HTTPException(status_code=404, detail="Error ID: 150")
