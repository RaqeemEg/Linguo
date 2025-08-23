import enum
from sqlalchemy import (
    Column, String, DateTime, func, ForeignKey, Boolean, BigInteger, Enum
)
from sqlalchemy.orm import relationship
from .base import Base

class ParticipantRole(str, enum.Enum):
    host = "host"
    participant = "participant"

class ParticipantStatus(str, enum.Enum):
    joined = "joined"
    left = "left"
    kicked = "kicked"

class Participant(Base):
    __tablename__ = "participants"

    id = Column(BigInteger, primary_key=True)
    meeting_id = Column(BigInteger, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(BigInteger, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    display_name = Column(String(100), nullable=False)
    role = Column(Enum(ParticipantRole), nullable=False, default=ParticipantRole.participant)
    status = Column(Enum(ParticipantStatus), nullable=False, default=ParticipantStatus.joined)
    is_muted = Column(Boolean, nullable=False, default=False)
    is_video_on = Column(Boolean, nullable=False, default=True)
    joined_at = Column(DateTime, nullable=False, server_default=func.now())
    left_at = Column(DateTime, nullable=True)

    # Relationships
    meeting = relationship("Meeting", back_populates="participants")
    user = relationship("User")
