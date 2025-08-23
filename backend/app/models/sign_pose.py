import uuid
from sqlalchemy import Column, String, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from app.models.base import Base


class SignPose(Base):
    __tablename__ = "sign_poses"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    gloss_id = Column(String(36), ForeignKey("sign_glosses.id", ondelete="CASCADE"))
    pose_data = Column(LargeBinary, nullable=False)  # 3D skeleton, JSON, or binary blob
    frame_number = Column(String(50), nullable=True)

    gloss = relationship("SignGloss", back_populates="poses")
