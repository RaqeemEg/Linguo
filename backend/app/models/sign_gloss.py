import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base


class SignGloss(Base):
    __tablename__ = "sign_glosses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"))
    gloss = Column(String(255), nullable=False)
    meaning = Column(String(500), nullable=True)

    document = relationship("Document")
    poses = relationship("SignPose", back_populates="gloss", cascade="all, delete-orphan")
