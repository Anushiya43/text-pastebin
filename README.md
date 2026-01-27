# TestPasteBin

A simple pastebin application to share code snippets and text.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd testpastebin
```

### 2. Setup Backend

#### Navigate to backend folder:
```bash
cd backend
```

#### Install Python dependencies:
```bash
pip install -r requirements.txt
```

#### Create `.env` file:
Create a file named `.env` in the `backend` folder with the following content:

```env
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/pastebin_db
```

**Replace:**
- `username` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `pastebin_db` - Your database name

**Example:**
```env
DATABASE_URL=postgresql+asyncpg://postgres:mypassword@localhost:5432/pastebin_db
```

#### Run the backend server:
```bash
uvicorn main:app --reload
```

✅ Backend will run at: **http://localhost:8000**

---

### 3. Setup Frontend

#### Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

#### Install Node dependencies:
```bash
npm install
```

#### Create `.env` file:
Create a file named `.env` in the `frontend` folder with the following content:

```env
VITE_API_URL=http://localhost:8000
```

**Note:** If your backend runs on a different port, update the URL accordingly.

#### Run the frontend server:
```bash
npm run dev
```

✅ Frontend will run at: **http://localhost:5173**

---

### 4. Access the Application

Open your browser and go to: **http://localhost:5173**

---

## Environment Variables Summary

### Backend `.env` file location: `backend/.env`
```env
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/pastebin_db
```

### Frontend `.env` file location: `frontend/.env`
```env
VITE_API_URL=http://localhost:8000
```

---

## Tech Stack

**Frontend:** React + Vite  
**Backend:** FastAPI + PostgreSQL

---

## Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running
- Verify your database credentials in `backend/.env`
- Create the database if it doesn't exist:
  ```sql
  CREATE DATABASE pastebin_db;
  ```

### Port Already in Use
- Backend: Change the port by running `uvicorn main:app --reload --port 8001`
- Frontend: The port will be automatically changed by Vite

### Module Not Found
- Backend: Run `pip install -r requirements.txt` again
- Frontend: Delete `node_modules` folder and run `npm install` again
