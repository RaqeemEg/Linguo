from sqlalchemy import (
    Column, String, DateTime, func, BigInteger
)
from sqlalchemy.orm import relationship
from .base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True) # AUTO_RANDOM is a DB-level feature
    username = Column(String(100), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    # Relationships
    created_meetings = relationship("Meeting", back_populates="creator", cascade="all, delete-orphan", foreign_keys="Meeting.creator_id")
