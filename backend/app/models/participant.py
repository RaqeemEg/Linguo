import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.models.base import Base


class Participant(Base):
    __tablename__ = "participants"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    meeting_id = Column(String(36), ForeignKey("meetings.id", ondelete="CASCADE"))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)  # null = guest
    display_name = Column(String(100), nullable=True)
    role = Column(String(20), default="guest")       # host, co-host, guest
    status = Column(String(20), default="joined")    # joined, left, kicked
    is_muted = Column(Boolean, default=False)
    is_video_on = Column(Boolean, default=True)
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    left_at = Column(DateTime(timezone=True), nullable=True)

    meeting = relationship("Meeting", back_populates="participants")
    user = relationship("User")
