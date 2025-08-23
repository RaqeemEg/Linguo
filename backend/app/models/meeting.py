import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.models.base import Base


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    code = Column(String(36), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=True)
    creator_id = Column(String(36), ForeignKey("users.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    ended_at = Column(DateTime(timezone=True), nullable=True)

    participants = relationship("Participant", back_populates="meeting", cascade="all, delete-orphan")
    messages = relationship("ChatMessage", back_populates="meeting", cascade="all, delete-orphan")
