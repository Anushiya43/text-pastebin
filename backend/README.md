# Backend - TestPasteBin

FastAPI backend for the pastebin application.

## How to Run

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create `.env` file with your database URL:
   ```
   DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/pastebin_db
   ```

3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

Server will start at: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

## Requirements

- Python 3.8+
- PostgreSQL database
