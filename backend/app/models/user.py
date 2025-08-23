import uuid
from sqlalchemy import Column, String, DateTime, func
from sqlalchemy.orm import relationship
from app.models.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(100), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    meetings = relationship("Meeting", backref="creator", cascade="all, delete-orphan")
    chat_messages = relationship("ChatMessage", backref="sender", cascade="all, delete-orphan")
    documents = relationship("Document", backref="owner", cascade="all, delete-orphan")
