from sqlalchemy import (
    Column, String, Text, INT
)
from sqlalchemy.orm import relationship
from .base import Base

class SignGloss(Base):
    __tablename__ = "sign_glosses"

    id = Column(INT, primary_key=True)
    gloss_text = Column(String(255), unique=True, nullable=False)
    description = Column(Text, nullable=True)

    # Relationships
    poses = relationship("SignPose", back_populates="gloss", cascade="all, delete-orphan")
