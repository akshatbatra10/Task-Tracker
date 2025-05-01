# 📝 Task Tracker App

A full-stack task management application built with **React (Vite)**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

Users can sign up, create projects (up to 4), and manage tasks within those projects — with filters, inline editing, and toast notifications for a smooth UX.

---

## 🔗 Live Demo

> ℹ️ _(Add link here if deployed on Vercel / Render)_

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
