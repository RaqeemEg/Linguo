import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.participant import ParticipantCreate, ParticipantResponse
from app.schemas.meeting import MeetingCreate, MeetingResponse
from app.dependencies import get_db
from app.services import meeting_service


router = APIRouter(
    prefix="/rooms",
    tags=["Meetings"]
)


@router.post(
    "/",
    response_model=MeetingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new meeting room"
)
def create_meeting(
    meeting_data: MeetingCreate,
    db: Session = Depends(get_db)
):
    new_meeting = meeting_service.create_new_meeting(db=db, meeting_data=meeting_data)
    return new_meeting


@router.get(
    "/{code}",
    response_model=MeetingResponse,
    summary="Get meeting room details by code"
)
def get_meeting(code: str, db: Session = Depends(get_db)):

    meeting = meeting_service.get_meeting_by_code(db=db, code=code)
    
    if not meeting:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Meeting room with code '{code}' not found."
        )
        
    return meeting


@router.post(
    "/{code}/join",
    response_model=ParticipantResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Join a meeting room"
)
def join_meeting(code: str, participant_data: ParticipantCreate, db: Session = Depends(get_db)):
    """
    Allows a user (as a guest for now) to join an existing meeting room.
    """
    participant = meeting_service.add_participant_to_meeting(
        db=db, code=code, participant_data=participant_data
    )
    
    if not participant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Meeting room with code '{code}' not found or is inactive."
        )
        
    return participant
