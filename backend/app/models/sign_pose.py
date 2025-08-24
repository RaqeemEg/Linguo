from sqlalchemy import (
    Column, ForeignKey, BigInteger, JSON, INT
)
from sqlalchemy.orm import relationship
from .base import Base

class SignPose(Base):
    __tablename__ = "sign_poses"

    id = Column(BigInteger, primary_key=True)
    gloss_id = Column(INT, ForeignKey("sign_glosses.id", ondelete="CASCADE"), nullable=False)
    frame_index = Column(INT, nullable=False)
    pose_data = Column(JSON, nullable=False)

    
    gloss = relationship("SignGloss", back_populates="poses")
