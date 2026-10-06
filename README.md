# Employee Visitor Management System

A complete MERN Stack CRUD project for managing organization visitors.

## Features
- Add visitor
- View all visitors
- Update visitor details
- Delete visitor
- Search by visitor name or mobile number
- Checked In / Checked Out status
- MongoDB persistence
- Responsive React UI

## Requirements
- Node.js installed
- MongoDB local server OR MongoDB Atlas account

## Backend setup
```bash
cd backend
npm install
copy .env.example .env
```
Edit `.env` and set `MONGO_URI`.

Run:
```bash
npm run dev
```
Backend: http://localhost:5000

## Frontend setup
Open a second terminal:
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```
Frontend: http://localhost:5173

If using PowerShell, use:
```powershell
Copy-Item .env.example .env
```

## MongoDB Atlas
Set `MONGO_URI` in `backend/.env` to your Atlas connection string. Do not commit `.env` to GitHub.

## API
- GET `/api/visitors`
- GET `/api/visitors/:id`
- GET `/api/visitors/search?query=Rahul`
- POST `/api/visitors`
- PUT `/api/visitors/:id`
- DELETE `/api/visitors/:id`
