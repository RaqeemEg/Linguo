from sqlalchemy import (
    Column, String, DateTime, func, ForeignKey, Boolean, BigInteger
)
from sqlalchemy.orm import relationship
from .base import Base

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(BigInteger, primary_key=True)
    code = Column(String(36), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=True)
    creator_id = Column(BigInteger, ForeignKey("users.id", ondelete="SET NULL"))
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    ended_at = Column(DateTime, nullable=True)

    # Relationships
    creator = relationship("User", back_populates="created_meetings")
    participants = relationship("Participant", back_populates="meeting", cascade="all, delete-orphan")
    chat_messages = relationship("ChatMessage", back_populates="meeting", cascade="all, delete-orphan")
