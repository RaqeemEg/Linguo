from pydantic import BaseModel, Field
from typing import Optional

# =================================================================
# Request Schemas - For data coming INTO the API
# =================================================================

class ParticipantCreate(BaseModel):

    display_name: str = Field(..., min_length=2, max_length=100, description="The name the participant will use in the meeting.")



class ParticipantResponse(BaseModel):

    id: int
    display_name: str
    role: str
    status: str
    meeting_id: int

    class Config:

        from_attributes = True
