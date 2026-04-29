# Movie Streaming Platform with Role-Based Access and JWT Security

This is a modern, full-stack Movie Streaming application built using Spring Boot for the backend and React for the frontend. The project implements role-based access control with JWT authentication and authorization, providing secure access to both admin and user functionalities.

## Key Features

### Role-Based Access
- **Admin and User roles** with specific permissions.
- **Admin** can manage movies, categories, and users.
- **Users** can register, login, and manage their own watchlists and watch history.

### JWT Security
- Secure authentication with **JSON Web Tokens**.
- Protects sensitive endpoints and ensures proper access control.

### Admin Capabilities
- Add, update, and delete movies.
- Assign movies to categories.
- Manage user accounts and roles.

### User Features
- Register and manage personal accounts.
- Add movies to **watchlist**.
- Track and view **watch history**.
- Browse movies by category.

### Movie & Category Management
- Dynamic categorization of movies by admin.
- Easy browsing and filtering for users.

## Tech Stack
- **Backend**: Spring Boot, JPA/Hibernate, JWT Security.
- **Frontend**: React, React Router, Bootstrap/Material UI.
- **Database**: MySQL

## Getting Started
1.  **Backend**:
    - Configure MySQL in `src/main/resources/application.properties`.
    - Run `mvn spring-boot:run`.
2.  **Frontend**:
    - Run `npm install` to install dependencies.
    - Run `npm start` to launch the app.
