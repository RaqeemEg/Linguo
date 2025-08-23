from sqlalchemy import (
    Column, String, DateTime, func, ForeignKey, BigInteger, Text
)
from sqlalchemy.orm import relationship
from .base import Base

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(BigInteger, primary_key=True)
    meeting_id = Column(BigInteger, ForeignKey("meetings.id", ondelete="CASCADE"), nullable=False)
    sender_id = Column(BigInteger, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    sender_name = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, nullable=False, server_default=func.now())

    # Relationships
    meeting = relationship("Meeting", back_populates="chat_messages")
    sender = relationship("User")
