# 🌐 Citizen Sahyog

> **A production‑ready grievance redressal platform bridging citizens and government authorities through secure, transparent, and data‑driven workflows.**

Citizen Sahyog is a full‑stack web application designed to streamline how citizens raise public issues and how authorities track, manage, and resolve them efficiently. The platform focuses on **accountability, role‑based access, real‑time updates, and analytics‑driven decision making**.

---

## ✨ Key Highlights

* 🔐 **Secure Authentication & Authorization** (JWT, role‑based access)
* 👤 **Citizen & Admin Roles** with separate dashboards
* 📝 **Complaint Lifecycle Management** (create → track → resolve)
* 🗺️ **Interactive Map Integration** for location‑based complaints
* 📊 **Admin Analytics Dashboard** powered by real MongoDB data
* 🚫 **User Moderation** (block / unblock users)
* ⚡ **Scalable REST APIs** with clean architecture
* 🎨 **Modern UI/UX** built with reusable components

---

## 🏗️ System Architecture

```
Frontend (React)
   ↓  (Axios + JWT)
Backend (Node.js + Express)
   ↓
MongoDB (Mongoose ODM)
```

* **Frontend** consumes secure REST APIs
* **Backend** handles authentication, authorization, business logic
* **Database** stores users, complaints, statuses, analytics data

---

## 🧩 Tech Stack

### Frontend

* **React.js**
* **Tailwind CSS** (modern utility‑first styling)
* **Recharts** (analytics & visualization)
* **Lucide Icons**
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **JWT Authentication**
* **bcrypt.js** (password hashing)
* **Role‑based Middleware**

### Database

* **MongoDB**
* **Mongoose**

---

## 👥 User Roles & Features

### 👤 Citizen

* Register & login securely
* Raise public complaints with category & location
* Track complaint status in real time
* View complaint history
* Access interactive map for nearby issues

### 🛡️ Admin

* Secure admin login
* View **all users** (active / blocked)
* Block or unblock users
* View **all complaints** across the platform
* Update complaint status
* Access **analytics dashboard** (real data from MongoDB)

---

## 📊 Analytics Dashboard (Admin)

The admin analytics panel provides **real insights**, not mock data:

* Total complaints count
* Resolution rate
* Weekly & monthly complaint trends
* Category‑wise distribution
* Status breakdown (Pending / In Progress / Resolved)

> All charts are generated dynamically from MongoDB using backend aggregation logic.

---

## 🔐 Security Measures

* JWT‑based authentication
* Password hashing using bcrypt
* Protected routes (user & admin)
* Admin‑only middleware for sensitive operations
* Token validation on every request

---

## 📂 Project Structure (Simplified)

```
frontend/
 ├── components/
 ├── pages/
 ├── services/
 └── App.jsx

backend/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middleware/
 └── server.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hamzas07/citizen-sahyog.git
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=7878
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Future Enhancements

* Government department‑wise routing
* SLA‑based complaint escalation
* Email / SMS notifications
* AI‑assisted complaint categorization
* Mobile application

---

## 🎯 Why This Project Matters

Citizen Sahyog is not a basic CRUD app.

It demonstrates:

* Real‑world problem solving
* Secure full‑stack architecture
* Role‑based systems used in production apps
* Data analytics & visualization
* Scalable backend design

This project is suitable for:

* Hackathons
* Internship & placement evaluations
* Real‑world deployment scenarios

---

## 👨‍💻 Author

**Hamza Ansari**
Computer Engineering Student | Full‑Stack Developer

> Built with passion, discipline, and a strong focus on production‑grade engineering.

---

⭐ If you find this project interesting, consider starring the repository!
