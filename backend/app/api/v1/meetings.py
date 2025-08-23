import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

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
