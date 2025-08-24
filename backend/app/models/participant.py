import enum
from sqlalchemy import (
    Column,
    DateTime,
    func,
    ForeignKey,
    Boolean,
    BigInteger,
    Enum,
    UniqueConstraint,
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
    __table_args__ = (UniqueConstraint("meeting_id", "user_id"),)

    id = Column(BigInteger, primary_key=True)
    meeting_id = Column(
        BigInteger,
        ForeignKey("meetings.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    user_id = Column(
        BigInteger,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    role = Column(
        Enum(ParticipantRole), nullable=False, default=ParticipantRole.participant
    )
    status = Column(
        Enum(ParticipantStatus), nullable=False, default=ParticipantStatus.joined
    )
    camera_enabled = Column(Boolean, default=False)
    microphone_enabled = Column(Boolean, default=False)
    screen_sharing_active = Column(Boolean, default=False)
    joined_at = Column(DateTime, nullable=False, server_default=func.now())
    left_at = Column(DateTime, nullable=True)

    # Relationships
    # Meeting -> Patricipant (One to Many)
    meeting = relationship("Meeting", back_populates="participants")
    user = relationship("User", back_populates="participations")
