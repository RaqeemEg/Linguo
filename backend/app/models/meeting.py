from sqlalchemy import (
    Column,
    String,
    DateTime,
    func,
    ForeignKey,
    Boolean,
    BigInteger,
    Enum,
)
from sqlalchemy.orm import relationship
from .base import Base
from enum import Enum as PyEnum


class MeetingStatus(str, PyEnum):
    SCHEDULED = "scheduled"
    ACTIVE = "active"
    ENDED = "ended"
    CANCELLED = "cancelled"


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(BigInteger, primary_key=True)
    code = Column(String(36), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=True)
    organizer_id = Column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"))
    started_at = Column(DateTime, nullable=False, server_default=func.now())
    ended_at = Column(DateTime, nullable=True)
    status = Column(
        Enum(MeetingStatus), nullable=False, server_default=MeetingStatus.ACTIVE
    )

    # Relationships
    organizer = relationship("User", back_populates="organized_meetings")
    participants = relationship(
        "Participant", back_populates="meeting", cascade="all, delete-orphan"
    )
    chat_messages = relationship(
        "ChatMessage", back_populates="meeting", cascade="all, delete-orphan"
    )
