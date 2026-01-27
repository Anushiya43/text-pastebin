from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PasteBase(BaseModel):
    content: str
    views_left: Optional[int] = None # Optional limit on views
    expires_minutes: Optional[int] = None # Optional time limit in minutes

class PasteCreate(PasteBase):
    pass

class PasteResponse(BaseModel):
    id: str
    content: str
    created_at: datetime
    expires_at: Optional[datetime]
    views_left: Optional[int]

    class Config:
        from_attributes = True
