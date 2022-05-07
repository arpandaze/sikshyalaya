from cruds.base import CRUDBase
from schemas.assignment_upload import AssignmentUploadCreate, AssignmentUploadUpdate
from models.assignment_upload import AssignmentUpload
from sqlalchemy.orm import Session
from cruds import crud_user, crud_group
from models import User
from typing import Any


class CRUDAssignmentUpload(
    CRUDBase[AssignmentUpload, AssignmentUploadCreate, AssignmentUploadUpdate]
):
    def get_by_assignment_id(self, db: Session, *, assignmentId: int, studentId: int):
        return (
            db.query(self.model)
            .filter_by(assignment_id=assignmentId)
            .filter_by(student_id=studentId)
            .first()
        )

    def get_all_by_assignment_id_as_teacher(self, db: Session, *, assignmentId: int):
        return db.query(self.model).filter_by(assignment_id=assignmentId).all()


crud_assignment_upload = CRUDAssignmentUpload(AssignmentUpload)
