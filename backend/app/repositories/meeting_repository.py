from typing import Optional, List
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from .base import BaseRepository
from app.models.meeting import Meeting, MeetingStatus
from app.models.participant import Participant
import uuid


class MeetingRepository(BaseRepository[Meeting]):
    def __init__(self, db: Session):
        super().__init__(db, Meeting)

    def get_by_code(self, code: str) -> Optional[Meeting]:
        return self.db.query(Meeting).filter(Meeting.code == code).first()

    # joinedload -> make all entities(rows) loaded firstly. 
    #! without it each access to an enetity it will cost a query
    def get_with_participants(self, meeting_id: int) -> Optional[Meeting]:
        return (
            self.db.query(Meeting)
            .options(joinedload(Meeting.participants).joinedload(Participant.user))
            .filter(Meeting.id == meeting_id)
            .first()
        )

    def get_by_organizer(self, organizer_id: int) -> List[Meeting]:
        return self.db.query(Meeting).filter(Meeting.organizer_id == organizer_id).all()

    def get_active_meetings(self) -> List[Meeting]:
        return (
            self.db.query(Meeting).filter(Meeting.status == MeetingStatus.ACTIVE).all()
        )

    def create_with_code(self, organizer_id: int, title: str = None) -> Meeting:
        code = str(uuid.uuid4())
        return self.create(
            code=code,
            organizer_id=organizer_id,
            title=title,
            status=MeetingStatus.ACTIVE,
        )

    def update_status(self, meeting: Meeting, status: MeetingStatus) -> Meeting:
        if status == MeetingStatus.ENDED:
            return self.update(meeting, status=status, ended_at=func.now())
        return self.update(meeting, status=status)
