from pydantic import BaseModel, Field
import uuid
from typing import Optional

# Base Schemas - Common fields for other schemas to inherit from
class MeetingBase(BaseModel):
    """
    Base schema for a meeting, contains common fields.
    """
    title: Optional[str] = Field(None, max_length=255, description="Optional title for the meeting room.")



# Request Schemas - For data coming INTO the API
class MeetingCreate(MeetingBase):
    """
    Schema used when a user wants to create a new meeting.
    The creator_id will be handled by the authentication system later.
    """
    pass # Inherits the 'title' field from MeetingBase



# Response Schemas - For data going OUT of the API
class MeetingResponse(MeetingBase):
    """
    Schema for the data we send back to the client after creating a meeting.
    This represents a single meeting room's public information.
    """
    id: int
    code: str = Field(..., description="The unique code to join the meeting.")
    is_active: bool

    class Config:
        """
        Pydantic configuration to allow creating this schema from an ORM model.
        """
        from_attributes = True

