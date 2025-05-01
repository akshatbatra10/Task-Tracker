# 📝 Task Tracker App

A full-stack task management application built with **React (Vite)**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

Users can sign up, create projects (up to 4), and manage tasks within those projects — with filters, inline editing, and toast notifications for a smooth UX.

---

## 🔗 Live Demo

> http://task-tracker-rho-three.vercel.app/

---

## 🚀 Features

### ✅ Authentication

- User signup & login
- JWT-based authentication
- Role-based route protection using Zustand

### ✅ Project Management

- Create, update, delete projects
- Max 4 projects per user (limit enforced)
- Clean dashboard layout with toast feedback

### ✅ Task Management

- Create, view, update, delete tasks
- Status: Pending | In Progress | Completed
- Inline editing and filters by status
- Task count badges per filter tab

### ✅ UX

- Toast notifications (`react-hot-toast`)
- Zustand for global auth state
- Route guards: private and public
- Responsive UI with TailwindCSS

---

## 🛠 Tech Stack

| Frontend           | Backend               |
| ------------------ | --------------------- |
| React + TypeScript | Node.js + Express     |
| Tailwind CSS       | MongoDB + Mongoose    |
| Zustand (state)    | JWT Auth              |
| React Router DOM   | REST API Architecture |
| react-hot-toast    |                       |

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/akshatbatra10/Task-Tracker.git
cd task-tracker

cd server
npm install
cp .env.example .env
# Edit the .env file with your credentials:
# - PORT=3000
# - MONGO_URI=<your MongoDB connection string>
# - JWT_SECRET=<your JWT secret>
npm run dev

cd ../client
npm install
cp .env.example .env
# Edit the .env file with:
# VITE_API_BASE_URL=http://localhost:3000/api
npm run dev
```

## 📁 Folder Structure

```
task-tracker/
├── client/                        # React frontend (Vite + TypeScript)
│   ├── public/                    # Static assets
│   └── src/
│       ├── components/            # Reusable UI elements (e.g., InputField)
│       ├── pages/                 # Route-level views (Signup, Login, Dashboard, etc.)
│       ├── services/              # API calls (authService, projectService, taskService)
│       ├── store/                 # Zustand store (auth state)
│       ├── routes/                # Route guards (PrivateRoute, PublicRoute)
│       ├── App.tsx                # Main app component
│       └── main.tsx              # App entry point
│
├── server/                        # Node.js backend (Express + MongoDB)
│   └── src/
│       ├── config/                # Database connection config
│       ├── controllers/           # Business logic (auth, project, task)
│       ├── middleware/            # JWT auth middleware
│       ├── models/                # Mongoose models
│       ├── routes/                # Express route handlers
|       ├── services/              # Business logic
|       ├── utils/                 # helper functions
│       └── index.js               # Entry point for backend
│
├── .gitignore
├── README.md
└── package.json

```
