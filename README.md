Scalable REST API for a Task Management System
This repository contains the project submission for the Backend Developer Intern assignment. It is a feature-complete, scalable, and secure REST API built with the MERN stack (Node.js, Express.js, MongoDB) and includes a basic React.js frontend for demonstration and testing.

Live Demo Links
Live Frontend (Vercel): https://taskflow-ruddy-rho.vercel.app/

Live Backend (Render): https://task-manager-api-i9s5.onrender.com/

Live API Documentation (Swagger): https://task-manager-api-i9s5.onrender.com/api-docs

✅ Core Features Implemented
This project successfully implements all the core features outlined in the assignment.

Backend (Primary Focus)
User Registration & Login: ✅ Implemented with secure password hashing (bcryptjs) and JWT-based authentication.

Role-Based Access: ✅ Implemented a user vs admin role system. Admin users have access to protected routes for user management.

CRUD APIs: ✅ Full CRUD (Create, Read, Update, Delete) APIs for a tasks entity are implemented and protected.

Error Handling & Validation: ✅ Implemented server-side input validation using express-validator on authentication routes. Centralized error handling is in place.

API Documentation: ✅ The entire API is documented using Swagger, providing an interactive UI to test all endpoints.

Database Schema: ✅ Clear and scalable schemas for User and Task models were designed using Mongoose for MongoDB.

Basic Frontend:
Built with React.js: ✅ A simple and functional UI built with React and Vite.

User Authentication Flow: ✅ The UI allows users to register, log in, and log out.

Protected Dashboard: ✅ The main task management dashboard is a protected route, accessible only with a valid JWT.

CRUD Actions: ✅ The frontend provides an interface to create, view, edit, delete, and change the status of tasks.

API Messaging: ✅ Success and error messages from the API are displayed to the user.

Security & Scalability
Secure JWT Handling: ✅ JWTs are generated on login/register and required for all protected endpoints via middleware.

Input Sanitization & Validation: ✅ express-validator is used to validate and sanitize user input on critical authentication routes.

Scalable Project Structure: ✅ The project is organized in a monorepo style with separate backend and frontend directories, allowing for independent development, scaling, and deployment.

Tech Stack
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Passport.js (for Google OAuth), Swagger, Express-validator

Frontend: React.js, Vite, Axios, Tailwind CSS, react-router-dom, react-beautiful-dnd

Setup and Installation
Instructions for running the project locally.

Backend
Navigate to the backend directory: cd backend

Install dependencies: npm install

Create a .env file and add the required environment variables (MONGO_URI, JWT_SECRET, etc.).

Start the server: npm start

Frontend
Navigate to the frontend/task_manager-ui directory.

Install dependencies: npm install --legacy-peer-deps

Start the development server: npm run dev

Scalability & Deployment Notes
(As requested in the deliverables)

This application was designed with scalability in mind:

Stateless API: The backend is stateless and uses JWTs for authentication, which is ideal for horizontal scaling. Multiple instances of the API can be run behind a load balancer without session management issues.

Caching: For a high-traffic environment, a caching layer with Redis could be implemented. This would be used to cache frequently requested data, such as user profiles or specific tasks, drastically reducing database load and improving response times.

Logging & Monitoring: For production, a robust logging solution like Winston would be integrated to log errors and application events to files or a logging service. This is critical for debugging and monitoring application health.

API Versioning: While not implemented, the API is structured to easily support versioning (e.g., /api/v1/tasks). This would allow for introducing non-breaking changes in the future as the application evolves.
