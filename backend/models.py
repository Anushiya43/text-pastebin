from sqlalchemy import Column, String, Text, DateTime, Integer
from sqlalchemy.sql import func
from database import Base
import uuid

class Paste(Base):
    __tablename__ = "pastes"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    views_left = Column(Integer, nullable=False)
