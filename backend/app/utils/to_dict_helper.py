from datetime import datetime
from typing import Dict, Any, Optional, List
from app.models.meeting import MeetingStatus
from sqlalchemy.orm import Session


#  Convert Meeting model to dictionary format.
def meeting_to_dict(meeting, participants_count: Optional[int] = None):
    return {
        "meeting_id": meeting.id,
        "meeting_code": meeting.code,
        "title": meeting.title,
        "organizer_id": meeting.organizer_id,
        "organizer_name": (
            meeting.organizer.display_name if meeting.organizer else None
        ),
        "status": meeting.status,
        "started_at": meeting.started_at.isoformat(),
        "ended_at": (meeting.ended_at.isoformat() if meeting.ended_at else None),
        "is_active": meeting.status == MeetingStatus.ACTIVE,
        "participants_count": (
            len(meeting.participants) if meeting.participants else 0
        ),
    }


# Convert Participant model to dictionary format.
def participant_to_dict(participant) -> Dict[str, Any]:
    return {
        "participant_id": participant.id,
        "user_id": participant.user_id,
        "username": participant.user.username,
        "display_name": participant.user.display_name,
        "profile_picture_url": participant.user.profile_picture_url,
        "role": participant.role,
        "status": participant.status,
        "camera_enabled": participant.camera_enabled,
        "microphone_enabled": participant.microphone_enabled,
        "screen_sharing_active": participant.screen_sharing_active,
        "joined_at": participant.joined_at.isoformat(),
        "left_at": (participant.left_at.isoformat() if participant.left_at else None),
    }
