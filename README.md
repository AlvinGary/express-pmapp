# PMApp — Project Management REST API

A RESTful API for managing projects and tasks, built with **Node.js**, **Express**, and **MongoDB**. Implements JWT authentication, role-based access control (RBAC), and full CRUD for Projects and Tasks with populated relational data.

Originally built as the Final Project for the **Sanbercode NodeJS Bootcamp**, and now maintained as a portfolio project — currently being evolved toward a TypeScript version.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat&logo=jsonwebtokens&logoColor=white)
![Status](https://img.shields.io/badge/Status-Local%20Development-yellow)

> **Project Status: Local Development**
> This project currently runs locally and has not been deployed to a production server. See [Project Status](#project-status) for the roadmap.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Authentication Flow (Example)](#authentication-flow-example)
- [Test Accounts](#test-accounts)
- [Postman Documentation](#postman-documentation)
- [Testing](#testing)
- [Project Status](#project-status)
- [Learning Objectives](#learning-objectives)
- [Author](#author)

---

## Overview

PMApp models a simplified project-management workflow: **Admins** create and manage Projects and Tasks, **Members** can view them. Every Task is linked to a Project and to the Users involved, and relationships are resolved through Mongoose `populate()` so API responses return readable, related data instead of raw ObjectIds.

```text
User ──┬── creates ──> Project
       └── assigned ──> Task ──> belongs to ──> Project
```

---

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication (register, login, get current user)
- Password hashing with **bcrypt**
- Role-Based Access Control — `admin` and `member` roles

### 📁 Project Management
- Full CRUD on Projects

| Action | Admin | Member |
|---|:---:|:---:|
| Create Project | ✅ | ❌ |
| View All / By ID | ✅ | ✅ |
| Update Project | ✅ | ❌ |
| Delete Project | ✅ | ❌ |

### ✅ Task Management
- Full CRUD on Tasks, linked to Projects and Users
- Responses populate related Project and User data automatically

| Action | Admin | Member |
|---|:---:|:---:|
| Create Task | ✅ | ❌ |
| View All / By ID | ✅ | ✅ |
| Update Task | ✅ | ❌ |
| Delete Task | ✅ | ❌ |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM / schema modeling |
| **bcrypt** | Password hashing |
| **JSON Web Token** | Stateless authentication |
| **dotenv** | Environment configuration |
| **Nodemon** | Dev server auto-reload |
| **Postman** | API testing & documentation |

---

## Project Structure

```text
PMApp/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js     # Auth & user logic
│   │   ├── projectController.js  # Project CRUD logic
│   │   └── taskController.js     # Task CRUD logic
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── roleMiddleware.js     # RBAC guard
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   │
│   └── app.js                    # Express app + middleware registration
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js                     # Entry point
```

<details>
<summary><strong>Folder responsibilities (click to expand)</strong></summary>

| Folder / File | Responsibility |
|---|---|
| `config/` | App-level configuration, e.g. MongoDB connection |
| `controllers/` | Business logic for each resource |
| `middleware/` | JWT verification and role-based access guards |
| `models/` | Mongoose schemas representing MongoDB collections |
| `routes/` | Endpoint definitions, wired to controllers + middleware |
| `app.js` | Initializes Express, registers middleware and routes |
| `server.js` | Starts the HTTP server |

</details>

---

## Data Model

```text
MongoDB
└── pmapp
    ├── users
    ├── projects
    └── tasks
```

Relationships are handled via MongoDB `ObjectId` references and resolved with Mongoose `populate()`:

```text
Task
├── project    → references → Project
├── assignedTo → references → User
└── createdBy  → references → User
```

---

## Getting Started

### Requirements

- Node.js
- npm
- MongoDB
- MongoDB Shell (`mongosh`)

```bash
node --version
npm --version
mongosh --version
```

### Installation

```bash
git clone https://github.com/AlvinGary/express-pmapp.git
cd PMApp
npm install
```

### Environment Variables

Create a `.env` file in the project root (a `.env.example` template is included):

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/pmapp
JWT_SECRET=your_jwt_secret
```

> ⚠️ The `.env` file is **not committed to version control** — it may contain sensitive configuration such as database credentials and JWT secrets.

### Run MongoDB Locally

If MongoDB is set up as a Windows service, start the service before running the app. Otherwise, start it manually:

```powershell
.\mongod.exe --dbpath "YOUR_MONGODB_DATA_PATH"
```

### Run the App

```bash
# Development (with Nodemon)
npm run dev

# Standard start
npm start
```

The API will be available at:

```text
http://localhost:3000
```

**Base URL for all endpoints:**

```text
http://localhost:3000/api/v1
```

---

## API Reference

### Auth

| Method | Endpoint | Auth | Access |
|---|---|:---:|---|
| `POST` | `/auth/register` | Public | All |
| `POST` | `/auth/login` | Public | All |
| `GET` | `/auth/get-user` | JWT | Authenticated |
| `GET` | `/auth/users` | Public | All |
| `GET` | `/auth/users/:id` | Public | All |
| `PUT` | `/auth/users/:id` | Public | All |

> User-management endpoints above are kept as part of the bootcamp's practice scope.

### Project

| Method | Endpoint | Auth | Access |
|---|---|:---:|---|
| `POST` | `/project` | JWT | Admin |
| `GET` | `/project` | JWT | Admin / Member |
| `GET` | `/project/:id` | JWT | Admin / Member |
| `PUT` | `/project/:id` | JWT | Admin |
| `DELETE` | `/project/:id` | JWT | Admin |

### Task

| Method | Endpoint | Auth | Access |
|---|---|:---:|---|
| `POST` | `/task` | JWT | Admin |
| `GET` | `/task` | JWT | Admin / Member |
| `GET` | `/task/:id` | JWT | Admin / Member |
| `PUT` | `/task/:id` | JWT | Admin |
| `DELETE` | `/task/:id` | JWT | Admin |

>Note: The repository also contains several additional user-management endpoints that were implemented for authentication and CRUD practice. These endpoints are not part of the primary documented PMApp API scope.

---

## Authentication Flow (Example)

**1. Register**

```http
POST /api/v1/auth/register
```
```json
{
  "name": "Admin",
  "email": "admin@mail.com",
  "password": "123456",
  "role": "admin"
}
```

**2. Login**

```http
POST /api/v1/auth/login
```
```json
{
  "email": "admin@mail.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "YOUR_ACCESS_TOKEN",
  "user": {
    "_id": "USER_ID",
    "name": "Admin",
    "email": "admin@mail.com",
    "role": "admin"
  }
}
```

**3. Access a Protected Endpoint**

```http
GET /api/v1/auth/get-user
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The API verifies the token before granting access to protected routes.

---

## Test Accounts

For local testing only — **do not reuse these credentials in a production deployment.**

| Role | Email | Password |
|---|---|---|
| Admin | `admin@mail.com` | `123456` |
| Member | `member@mail.com` | `123456` |

---

## Postman Documentation

Full request/response examples, including auth flows and RBAC test cases, are documented in Postman:

**📄 Postman Documentation:**

[Postman API Documentation](https://red-meteor-942738.postman.co/workspace/My-Workspace~28766280-fe8f-4a26-8853-68d15848f064/collection/15890346-285466e4-2da5-447c-b979-aab2f243bafb?action=share&creator=15890346)

Covers:
- Authentication
- Project CRUD
- Task CRUD
- JWT authorization
- Admin vs. Member access scenarios

---

## Testing

The API has been manually tested locally with Postman across:

- User registration & login
- JWT authentication and token verification
- Get current authenticated user
- Project CRUD operations
- Task CRUD operations
- Admin-only authorization checks
- Member read-only authorization checks
- Mongoose schema validation
- Invalid / unauthorized request handling

---

## Project Status

**Current:** Local development only (`Node.js` + `Express.js` + `MongoDB` + `Mongoose`, served at `http://localhost:3000`). No production deployment yet.

**Planned next:**

- [ ] Migrate to TypeScript
- [ ] Add Swagger / OpenAPI documentation
- [ ] Deploy to a production environment
- [ ] Strengthen request validation
- [ ] Improve centralized error handling
- [ ] Automate API testing
- [ ] Add environment-specific configuration (dev / staging / prod)

---

## Learning Objectives

This project was built to practice and demonstrate:

- RESTful API design and architecture
- Express.js routing and middleware composition
- MVC-style project organization
- MongoDB + Mongoose schema design and validation
- ObjectId relationships and `populate()`
- Password hashing with bcrypt
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Environment variable management
- API testing and documentation with Postman

---

## Author

**Alvin Gary**
Built as the Final Project for the **Sanbercode NodeJS Bootcamp**, now maintained as an ongoing portfolio project.