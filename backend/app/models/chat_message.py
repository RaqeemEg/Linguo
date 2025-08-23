import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.models.base import Base


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    meeting_id = Column(String(36), ForeignKey("meetings.id", ondelete="CASCADE"))
    sender_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    sender_name = Column(String(100), nullable=True)
    message = Column(String(500), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    meeting = relationship("Meeting", back_populates="messages")
    sender = relationship("User", back_populates="chat_messages")
