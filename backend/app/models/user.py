from sqlalchemy import Column, String, DateTime, func, BigInteger, Text, Enum
from sqlalchemy.orm import relationship
from .base import Base
from enum import Enum as PyEnum


class UserRole(str, PyEnum):
    user = "user"
    admin = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True)
    display_name = Column(String(100), nullable=False)
    username = Column(String(100), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    profile_picture_url = Column(
        Text, server_default="/images/common/profile_avatar.png"
    )
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    last_active = Column(DateTime, nullable=False, server_default=func.now())
    role = Column(Enum(UserRole), nullable=False, server_default=UserRole.user)

    # Relationships
    # User -> Meeting (Many to Many)
    organized_meetings = relationship(
        "Meeting",
        back_populates="organizer",
        cascade="all, delete-orphan",
        foreign_keys="Meeting.organizer_id",
    )
    # User -> Patricipant (One to Many)
    participations = relationship(
        "Participant", back_populates="user", cascade="all, delete-orphan"
    )
