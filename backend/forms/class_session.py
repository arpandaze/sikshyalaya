from fastapi import FastAPI, File, Form, UploadFile
from schemas.class_session import ClassSessionCreate
from typing import List, Optional
from datetime import datetime


class ClassSessionCreateForm:
    def __init__(
        self,
        start_time: datetime = Form(...),
        end_time: datetime = Form(...),
        instructor: Optional[List[int]] = Form([]),
        group: int = Form(...),
        description: str = Form(...),
        file: Optional[List[UploadFile]] = File(None),
    ):
        self.start_time = start_time
        self.end_time = end_time
        self.instructor = instructor
        self.group = group
        self.description = description
        self.file = file