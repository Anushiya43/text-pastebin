from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import Paste
from schemas import PasteCreate
from datetime import datetime, timedelta,timezone

async def create_paste(db: AsyncSession, paste: PasteCreate):
    expires_at = None
    if paste.expires_minutes:
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=paste.expires_minutes)
    else:
        expires_at = datetime.now(timezone.utc) + timedelta(days=1)
    db_paste = Paste(
        content=paste.content,
        views_left=paste.views_left,
        expires_at=expires_at
    )
    db.add(db_paste)
    await db.commit()
    await db.refresh(db_paste)
    return db_paste

async def get_paste(db: AsyncSession, paste_id: str):
    result = await db.execute(select(Paste).where(Paste.id == paste_id))
    paste = result.scalars().first()
    
    if paste:
        # Check expiration logic
        if paste.expires_at and paste.expires_at < datetime.now(timezone.utc):
            await delete_paste(db, paste)
            return None
        
        if paste.views_left is not None:
            if paste.views_left ==  0:
                 await delete_paste(db, paste)
                 return None
            
            # Decrement views
            paste.views_left -= 1
            await db.commit()
            
    return paste

async def delete_paste(db: AsyncSession, paste: Paste):
    await db.delete(paste)
    await db.commit()
