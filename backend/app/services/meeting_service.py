import uuid
from typing import Optional
from sqlalchemy.orm import Session

from app.models.meeting import Meeting
from app.models.participant import Participant
from app.schemas.meeting import MeetingCreate
from app.schemas.participant import ParticipantCreate

def create_new_meeting(db: Session, meeting_data: MeetingCreate) -> Meeting:
    
    room_code = str(uuid.uuid4())

    
    # Note: creator_id will be added later with authentication
    new_meeting = Meeting(
        title=meeting_data.title,
        code=room_code
    )

    
    db.add(new_meeting)
    db.commit()
    db.refresh(new_meeting) # Refresh to get the ID and other defaults from the DB

    return new_meeting

def get_meeting_by_code(db: Session, code: str) -> Optional[Meeting]:
    """
    Retrieves a single meeting room from the database by its code.
    Returns the Meeting object or None if not found.
    """
    return db.query(Meeting).filter(Meeting.code == code).first()

def add_participant_to_meeting(db: Session, code: str, participant_data: ParticipantCreate) -> Optional[Participant]:
    """
    Adds a new participant to an existing meeting.
    Returns the new Participant object or None if the meeting is not found.
    """
    # First, find the meeting
    meeting = get_meeting_by_code(db, code)
    if not meeting:
        return None

    # Create the new participant instance
    # user_id is null for now, representing a guest
    new_participant = Participant(
        display_name=participant_data.display_name,
        meeting_id=meeting.id
    )

    db.add(new_participant)
    db.commit()
    db.refresh(new_participant)

    return new_participant
