from typing import Optional, List
from sqlalchemy.orm import Session, joinedload
from .base import BaseRepository
from app.models.participant import Participant, ParticipantStatus, ParticipantRole
from app.models.user import User

class ParticipantRepository(BaseRepository[Participant]):
    def __init__(self, db: Session):
        super().__init__(db, Participant)
    # get a specific participant with the meeting id and user id
    def get_by_meeting_and_user(
        self, meeting_id: int, user_id: int
    ) -> Optional[Participant]:
        return (
            self.db.query(Participant)
            .filter(
                Participant.meeting_id == meeting_id, Participant.user_id == user_id
            )
            .first()
        )

    # get all meeeting participants
    def get_meeting_participants(self, meeting_id: int) -> List[Participant]:
        return (
            self.db.query(Participant)
            .options(joinedload(Participant.user))
            .filter(Participant.meeting_id == meeting_id)
            .all()
        )

    # get active participants
    def get_active_participants(self, meeting_id: int) -> List[Participant]:
        return (
            self.db.query(Participant)
            .options(joinedload(Participant.user))
            .filter(
                Participant.meeting_id == meeting_id,
                Participant.status == ParticipantStatus.joined,
            )
            .all()
        )
    # get all meetings a user joined to 
    def get_user_participations(self, user_id: int) -> List[Participant]:
        return (
            self.db.query(Participant)
            .options(joinedload(Participant.meeting))
            .filter(Participant.user_id == user_id)
            .all()
        )

    def join_meeting(
        self,
        meeting_id: int,
        user_id: int,
        role: ParticipantRole = ParticipantRole.participant,
    ) -> Participant:
        return self.create(
            meeting_id=meeting_id,
            user_id=user_id,
            role=role,
            status=ParticipantStatus.joined,
        )

    def leave_meeting(self, participant: Participant) -> Participant:
        return self.update(
            participant, status=ParticipantStatus.left, left_at=func.now()
        )

    def update_media_settings(
        self,
        participant: Participant,
        camera_enabled: bool = None,
        microphone_enabled: bool = None,
        screen_sharing_active: bool = None,
    ) -> Participant:
        updates = {}
        if camera_enabled is not None:
            updates["camera_enabled"] = camera_enabled
        if microphone_enabled is not None:
            updates["microphone_enabled"] = microphone_enabled
        if screen_sharing_active is not None:
            updates["screen_sharing_active"] = screen_sharing_active

        return self.update(participant, **updates)
