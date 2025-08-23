from sqlalchemy import (
    Column, String, DateTime, func, ForeignKey, BigInteger, Text
)
from sqlalchemy.orm import relationship
from .base import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(BigInteger, primary_key=True)
    title = Column(String(255), nullable=False)
    owner_id = Column(BigInteger, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    file_url = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    # Relationships
    owner = relationship("User")
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")
