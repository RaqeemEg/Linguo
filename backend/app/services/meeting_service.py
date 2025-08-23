import uuid
from typing import Optional
from sqlalchemy.orm import Session

from app.models.meeting import Meeting
from app.schemas.meeting import MeetingCreate

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
