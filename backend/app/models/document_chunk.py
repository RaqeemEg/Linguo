from sqlalchemy import (
    Column, ForeignKey, BigInteger, Text, INT
)
from sqlalchemy.orm import relationship
from .base import Base, VECTOR

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(BigInteger, primary_key=True)
    document_id = Column(BigInteger, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(INT, nullable=False)
    content = Column(Text, nullable=False)
    text_embedding = Column(VECTOR, nullable=True)

    
    document = relationship("Document", back_populates="chunks")
