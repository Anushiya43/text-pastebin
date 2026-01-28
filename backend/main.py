from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import pastes
import os
from dotenv import load_dotenv


app = FastAPI()

load_dotenv()
ORIGINS = os.getenv("ORIGINS")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(pastes.router)

