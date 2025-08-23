import uuid
from sqlalchemy import Column, String, ForeignKey, LargeBinary, Integer
from sqlalchemy.orm import relationship
from app.models.base import Base


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"))
    chunk_index = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    embedding = Column(LargeBinary, nullable=True)  # for vector search

    document = relationship("Document", back_populates="chunks")
