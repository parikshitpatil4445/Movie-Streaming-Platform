# 🎬 Movie Streaming Platform

A full-stack web application that enables users to browse, stream, and manage movies with secure authentication and personalized features.

---

## 🚀 Overview

The **Movie Streaming Platform** is designed to simulate a real-world OTT system where users can:

* 🎥 Browse and stream movies
* 🔐 Securely authenticate using JWT
* 📂 Manage watchlists and history
* 👤 Access role-based dashboards (Admin/User)

This project demonstrates full-stack development with scalable architecture and modern web technologies.

---

## 🛠 Tech Stack

### 🔹 Frontend

* React.js
* CSS
* Axios (API communication)

### 🔹 Backend

* Spring Boot
* REST APIs
* JWT Authentication

### 🔹 Database

* MySQL

---

## ✨ Features

### 👤 Authentication & Authorization

* User registration & login
* JWT-based authentication
* Role-based access control

### 🎥 Movie Management

* Add, update, delete movies (Admin)
* Browse movies (User)
* Categorization of movies

### 📌 User Features

* Watchlist management
* Watch history tracking
* Personalized dashboard

### 🛡 Security

* Spring Security integration
* Token-based authentication (JWT)

---

## 📁 Project Structure

```id="7m4s2l"
Movie-Streaming-Platform/
├── Backend/                     # Spring Boot Backend
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── security/
│
├── movie-streaming-frontend/    # React Frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Backend (Spring Boot)

```bash id="0k6wkp"
cd Backend
mvn clean install
mvn spring-boot:run
```

---

### 🔹 Frontend (React)

```bash id="z5kz8q"
cd movie-streaming-frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create `.env` file in frontend:

```id="3xj8f0"
REACT_APP_API_URL=http://localhost:8080
```

⚠️ Do not upload `.env` files to GitHub.

---

## 📸 Screenshots

*Add screenshots here (Dashboard, Login, Movie List, etc.)*

---

## 🧠 How It Works

* Users register/login using JWT authentication
* Frontend communicates with backend APIs
* Backend processes requests and interacts with database
* Movies are fetched and displayed dynamically
* User actions (watchlist/history) are stored and managed

---

## 💡 Future Enhancements

* 🎬 Video streaming integration (actual media playback)
* 🤖 AI-based movie recommendations
* 📱 Mobile app version
* ☁️ Cloud deployment (AWS / Docker)

---

## 👨‍💻 Author

**Parikshit Patil**

* GitHub: https://github.com/parikshitpatil4445

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

