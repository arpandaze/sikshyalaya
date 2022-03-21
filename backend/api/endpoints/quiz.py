from datetime import datetime
from typing import Any, List, Dict

from hashlib import sha1

import os
import shutil

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.config import settings
import json
from models import User
from utils import deps
from cruds import crud_quiz, crud_question
from schemas import (
    Quiz,
    QuizCreate,
    QuizUpdate,
    QuizAnswer,
    QuizAnswerCreate,
    QuizAnswerUpdate,
    QuizQuestion,
    QuizQuestionCreate,
    QuizQuestionUpdate,
    QuizQuestionwoutAnswer,
)

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
import aiofiles
from core.config import settings

router = APIRouter()

QUIZ_ROUTE: str = "quiz"
QUIZ_QUESTION_UPLOAD_DIR: str = "question_image"
QUIZ_OPTION_UPLOAD_DIR: str = "option_image"
hashedQuestionRoute = sha1(
    QUIZ_QUESTION_UPLOAD_DIR.encode(encoding="UTF-8", errors="strict")
)
hashedOptionRoute = sha1(
    QUIZ_OPTION_UPLOAD_DIR.encode(encoding="UTF-8", errors="strict")
)


@router.get("/", response_model=List[Quiz])
async def get_quiz(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = -1,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    quiz = crud_quiz.get_multi(db, skip=skip, limit=limit)

    if current_user.user_type == settings.UserType.STUDENT.value:
        quiz_list = []
        for quizItem in quiz:
            for group in quizItem.group:
                if group.id == current_user.group.id:
                    quiz_list.append(quizItem)

        return quiz_list

    if current_user.user_type == settings.UserType.TEACHER.value:

        quiz_list = []
        for quizItem in quiz:
            for instructor in quizItem.instructor:
                if current_user.id == instructor.id:
                    quiz_list.append(quizItem)
        return quiz_list

    if current_user.user_type <= settings.UserType.ADMIN.value:
        return quiz


@router.post("/")
async def create_quiz(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: QuizCreate,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
) -> Any:
    quiz = crud_quiz.create(db, obj_in=obj_in)
    return {"msg": "success", "id": quiz.id}


@router.get("/{id}", response_model=Quiz)
async def get_specific_quiz(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.user_type == settings.UserType.STUDENT.value:
        quiz_list = await get_quiz(db=db, current_user=current_user)
        for quiz in quiz_list:
            if quiz.id == id:
                return quiz
        raise HTTPException(
            status_code=403, detail="Error ID: 133"
        )  # not accessible by the Student user

    if current_user.user_type == settings.UserType.TEACHER.value:
        quiz_list = await get_quiz(db=db, current_user=current_user)
        for quiz in quiz_list:
            if quiz.id == id:
                return quiz
        raise HTTPException(
            status_code=403, detail="Error ID: 134"
        )  # not accessible by the Teacher user

    if current_user.user_type <= settings.UserType.ADMIN.value:
        quiz = crud_quiz.get(db, id)
        return quiz


@router.put("/{id}", response_model=QuizUpdate)
async def update_quiz(
    db: Session = Depends(deps.get_db),
    *,
    id: int,
    obj_in: QuizUpdate,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
) -> Any:
    quiz = crud_quiz.get(db, id)
    quiz = crud_quiz.update(db, db_obj=quiz, obj_in=obj_in)
    return quiz


@router.get("/{quizid}/question", response_model=List[QuizQuestionwoutAnswer])
async def get_question(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    quiz = await get_specific_quiz(db, id=quizid, current_user=current_user)
    if not quiz:
        raise HTTPException(
            status_code=404, detail="Error ID = 135"
        )  # quiz not found in database

    questions = crud_question.get_all_by_quiz_id(db, quiz_id=quiz.id)
    return questions


@router.get("/{quizid}/question/{id}", response_model=QuizQuestionwoutAnswer)
async def get_specific_question(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:

    question = crud_question.get_by_quiz_id_question_id(
        db=db, quiz_id=quizid, questionid=id
    )

    if not question:
        raise HTTPException(
            status_code=404, detail="Error ID: 136"
        )  # question specific to that id not found

    return question


@router.post("/{quizid}/question")
async def create_question(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    obj_in: QuizQuestionCreate,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
) -> Any:
    obj_in.quiz_id = quizid
    # obj_in.question_image = "question"
    # obj_in.options = [
    #     {"image": eachDict["image"] if eachDict["image"] == "" else f"Options{index+1}"}
    #     for index, eachDict in enumerate(obj_in.options)
    # ]

    question = crud_question.create(db, obj_in=obj_in)
    quiz = crud_quiz.get(db=db, id=quizid)

    newMarks = quiz.total_marks + question.marks
    newQuiz = QuizUpdate(total_marks=newMarks)

    crud_quiz.update(db=db, db_obj=quiz, obj_in=newQuiz)

    hashedQuizId = sha1(str(quizid).encode(encoding="UTF-8", errors="strict"))

    hashedQuestionId = sha1(str(question.id).encode(encoding="UTF-8", errors="strict"))

    # if the question is said to have a IMAGE then only create the folder to store the image
    FILE_PATH = os.path.join(
        settings.UPLOAD_DIR_ROOT,
        QUIZ_ROUTE,
        hashedQuizId.hexdigest(),
        hashedQuestionId.hexdigest(),
    )

    FILE_PATH_QUESTION = os.path.join(FILE_PATH, hashedQuestionRoute.hexdigest())

    FILE_PATH_OPTION = os.path.join(FILE_PATH, hashedOptionRoute.hexdigest())

    if not os.path.exists(FILE_PATH_QUESTION):
        os.makedirs(FILE_PATH_QUESTION)

    if not os.path.exists(FILE_PATH_OPTION):
        os.makedirs(FILE_PATH_OPTION)

    return {"msg": "success", "id": question.id}


@router.put("/{quizid}/question/{id}")
async def update_question(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    obj_in: QuizQuestionUpdate,
    id: int,
    current_user: User = Depends(deps.get_current_active_teacher_or_above),
) -> Any:

    question = crud_question.get(db, id)

    # on question_type update, create folder to store image if not already present
    FILE_PATH_QUESTION = os.path.join(
        settings.UPLOAD_DIR_ROOT,
        QUIZ_QUESTION_UPLOAD_DIR,
        f"{quizid}/{question.id}",
    )

    if not os.path.exists(FILE_PATH_QUESTION):
        os.makedirs(FILE_PATH_QUESTION)

    # on option_type update, create folder to store image if not already present
    # if (obj_in.answer_type == AnswerType.IMAGE_OPTIONS.value) and (
    #     question.answer_type != obj_in.answer_type
    # ):
    #     FILE_PATH_OPTION = os.path.join(
    #         "static", QUIZ_OPTION_UPLOAD_DIR, f"{quizid}/{question.id}"
    #     )
    #     FILE_PATH_OPTION = os.path.join(current_directory, FILE_PATH_OPTION)

    #     if not os.path.exists(FILE_PATH_OPTION):
    #         os.makedirs(FILE_PATH_OPTION)

    if question.quiz_id == quizid == obj_in.quiz_id:
        question = crud_question.update(db, db_obj=question, obj_in=obj_in)
        return question
    else:
        raise HTTPException(
            status_code=403, detail="Error ID = 137"
        )  # noqa Access Denied!


# XXX: ENDPOINTS for questions to write and read files and answers to those files


# FIXME: Uploaded files directory fix it
@router.post("/{quizid}/question/{id}/question_image/")
async def create_question_files(
    db: Session = Depends(deps.get_db),
    files: List[UploadFile] = File(...),
    current_user=Depends(deps.get_current_active_teacher_or_above),
    *,
    quizid: int,
    id: int,
):
    question = await get_specific_question(
        db, quizid=quizid, id=id, current_user=current_user
    )

    hashedQuizId = sha1(str(quizid).encode(encoding="UTF-8", errors="strict"))

    hashedQuestionId = sha1(str(id).encode(encoding="UTF-8", errors="strict"))

    FILE_QUESTION_PATH = os.path.join(
        QUIZ_ROUTE,
        hashedQuizId.hexdigest(),
        hashedQuestionId.hexdigest(),
        hashedQuestionRoute.hexdigest(),
    )

    FILE_PATH = os.path.join(
        settings.UPLOAD_DIR_ROOT,
        FILE_QUESTION_PATH,
    )

    questionImages = []
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
        questionImages.append(
            f"{FILE_QUESTION_PATH}/{hashedFileName.hexdigest()}{fileExtension}"
        )

    obj_in = QuizQuestionUpdate(quiz_id=quizid, question_image=questionImages)
    updated = crud_question.update(db=db, db_obj=question, obj_in=obj_in)

    return updated


@router.post("/{quizid}/question/{id}/option_image/")
async def create_option_files(
    options: List,
    db: Session = Depends(deps.get_db),
    files: List[UploadFile] = File(...),
    current_user=Depends(deps.get_current_active_teacher_or_above),
    *,
    quizid: int,
    id: int,
):
    options = json.loads(options[0])

    question = await get_specific_question(
        db, quizid=quizid, id=id, current_user=current_user
    )

    hashedQuizId = sha1(str(quizid).encode(encoding="UTF-8", errors="strict"))

    hashedQuestionId = sha1(str(id).encode(encoding="UTF-8", errors="strict"))
    FILE_OPTION_PATH = os.path.join(
        QUIZ_ROUTE,
        hashedQuizId.hexdigest(),
        hashedQuestionId.hexdigest(),
        hashedOptionRoute.hexdigest(),
    )
    FILE_PATH = os.path.join(
        settings.UPLOAD_DIR_ROOT,
        FILE_OPTION_PATH,
    )
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
        alreadyModified = []
        for index, eachDict in enumerate(options):
            if eachDict["image"] == file.filename:
                if index not in alreadyModified:
                    eachDict[
                        "image"
                    ] = f"{FILE_OPTION_PATH}/{hashedFileName.hexdigest()}{fileExtension}"
                    alreadyModified.append(index)
                    break

    obj_in = QuizQuestionUpdate(quiz_id=quizid, options=json.dumps(options))
    updated = crud_question.update(db=db, db_obj=question, obj_in=obj_in)

    return {"msg": "success"}


@router.get("/{quizid}/question/{id}/{type}/{filename}")
async def get_image(
    db: Session = Depends(deps.get_db),
    *,
    quizid: int,
    id: int,
    filename: str,
    type: int,
    current_user: User = Depends(deps.get_current_active_user),
):
    question = await get_specific_question(
        db, quizid=quizid, id=id, current_user=current_user
    )

    if not question:
        raise HTTPException(status_code=404, detail="Error ID: 138")
        # question not found error

    if type == 1:
        if filename in question.question_image:
            FILE_PATH = os.path.join(
                settings.UPLOAD_DIR_ROOT, QUIZ_QUESTION_UPLOAD_DIR, f"{quizid}/{id}"
            )
        else:
            raise HTTPException(
                status_code=403, detail="Error ID: 139"
            )  # file not of that question

    if type == 2:
        if filename in question.option_image:
            FILE_PATH = os.path.join(
                settings.UPLOAD_DIR_ROOT, QUIZ_OPTION_UPLOAD_DIR, f"{quizid}/{id}"
            )
        else:
            raise HTTPException(
                status_code=403, detail="Error ID: 140"
            )  # file not of that question

    FILE_PATH = os.path.join(FILE_PATH, filename)

    if os.path.isfile(FILE_PATH):
        file = FileResponse(f"{FILE_PATH}")
        return file
    else:
        raise HTTPException(
            status_code=404, detail="Error ID: 141"
        )  # no file exist in the path


@router.delete("/{quizid}/")
async def delete_quiz(
    db: Session = Depends(deps.get_db),
    *,
    quizid=int,
    current_user: User = Depends(deps.get_current_active_teacher),
):
    quiz = crud_quiz.get(db, id=quizid)

    if not quiz:
        raise HTTPException(status_code=404, detail="Error ID: 143")

    for instructor in quiz.instructor:

        if instructor.id == current_user.id:

            print(instructor.id, current_user.id)
            quiz = crud_quiz.remove(db, id=quizid)

            hashedQuizId = sha1(str(quizid).encode(encoding="UTF-8", errors="strict"))

            FILE_PATH = os.path.join(
                settings.UPLOAD_DIR_ROOT,
                QUIZ_ROUTE,
                hashedQuizId.hexdigest(),
            )

            if os.path.exists(FILE_PATH):
                shutil.rmtree(FILE_PATH)

            return {"msg": "delete success"}

    raise HTTPException(
        status_code=403,
        detail="Error ID: 142",
    )  # teacher not associated with the quiz
