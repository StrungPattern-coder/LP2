# Cloud-Based Student Record Management System

This is a MERN-style student record system built for adding, updating, and retrieving student data from a database-backed API.

## Structure

- `backend/` - Express + MongoDB API
- `frontend/` - React + Vite UI

## Features

- Add student records
- Update existing student records
- Retrieve and search student data
- Filter by department and status
- Responsive admin-style dashboard

## Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file:

```bash
PORT=5002
MONGODB_URI=mongodb://127.0.0.1:27017/studentRecordsDB
FRONTEND_URL=http://localhost:5173
```

3. Start the API:

```bash
npm run dev
```

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create a `.env` file:

```bash
VITE_API_URL=http://localhost:5002
```

3. Start the frontend:

```bash
npm run dev
```

## API Endpoints

- `GET /students` - retrieve all students
- `GET /students/:id` - retrieve one student
- `POST /students` - create student
- `PUT /students/:id` - update student
- `DELETE /students/:id` - delete student

## Deployment Notes

- Set `FRONTEND_URL` on the backend to your deployed frontend origin.
- Set `VITE_API_URL` in the frontend to your deployed backend URL.
- Build frontend with `npm run build` and host the generated `dist/` folder on your chosen platform.

# mongodb+srv://lp2user:lp2password123@cluster0.rk1rpuj.mongodb.net/?appName=Cluster0