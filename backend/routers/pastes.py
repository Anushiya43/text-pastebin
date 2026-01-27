from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from schemas import PasteCreate, PasteResponse
import crud

router = APIRouter(
    prefix="/pastes",
    tags=["pastes"]
)

@router.post("/", response_model=PasteResponse)
async def create_paste(paste: PasteCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_paste(db, paste)

@router.get("/{paste_id}", response_model=PasteResponse)
async def read_paste(paste_id: str, db: AsyncSession = Depends(get_db)):
    db_paste = await crud.get_paste(db, paste_id)
    if db_paste is None:
        raise HTTPException(status_code=404, detail="Paste not found or expired")
    return db_paste
