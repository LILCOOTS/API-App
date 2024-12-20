# API-App Project

## Overview

This project is a Node.js-based backend application for user authentication and account management. It includes API routes for user registration, authentication, and email confirmation, and is documented with Swagger for ease of use. The project uses MongoDB for the database and integrates JWT for secure authentication.

## Features

- User registration with validation
- JWT-based authentication
- Email confirmation via welcome emails
- RESTful API endpoints
- API documentation using Swagger

---

## Development Environment Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (v16.x or higher)
- MongoDB (installed locally)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT = 8080
   USERNAME = "admin"
   PASSWORD = "password"
   SGMAIL_API_KEY = your_sendgrid_api_key
   FROM_EMAIL = your_email@example.com
   JWT_SECRET_KEY = your_jwt_secret_key
   ```

   To obtain a SendGrid API key for email services:
   1. Visit [SendGrid's website](https://sendgrid.com/), a reliable email delivery service that helps ensure smooth email communications for your application, and create an account if you don't have one.
   2. Navigate to the "API Keys" section in your SendGrid dashboard.
   3. Generate a new API key with the required permissions.
   4. Copy the generated API key and use it in place of `your_email_password` above.

   Note: SendGrid is an email delivery service that ensures reliable email communications for your application.
   

4. Start the MongoDB server:

   #### On Linux/MacOS:

   ```bash
   mongod
   ```

   #### On Windows:

   ````cmd
   "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"

   **Note:** If MongoDB is installed in a different directory on Windows, adjust the path accordingly. Alternatively, use a platform-agnostic approach like `mongosh` with your username and password for better flexibility:

   ```cmd
   mongosh -u <username> -p <password>
   ````

   ````

   **Note:** If MongoDB is installed in a different directory on Windows, adjust the path accordingly. Alternatively, use the `mongosh` command with your username and password for more flexibility:

   ```cmd
   mongosh -u <username> -p <password>
   ````

5. Run the application:

   ```bash
   npm start
   ```

### Running in Development Mode

To enable auto-reload during development, use:

```bash
npm run dev
```

---

## API Usage Guide

### Base URL

Localhost:

```
http://localhost:8080/
```

### Endpoints

#### 1. **Register User**

- **POST** `/api/signup`
- **Description:** Register a new user and send a confirmation email.
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "StrongPassword123!"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "_id": "609b8b8b8b8b8b8b8b8b8b8b",
      "username": "john_doe",
      "email": "john.doe@example.com"
    },
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc123xyz456"
  }
  ```

#### 2. **Login User**

- **POST** `/api/login`
- **Description:** Authenticate a user and generate a JWT token.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "StrongPassword123!"
  }
  ```
- **Response:**
  ```json
  {
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc123xyz456"
  }
  ```

#### 3. **Get User Profile**

- **GET** `/api/me`
- **Description:** Get the profile of the authenticated user.
- **Response:**
  ```json
  {
    "_id": "609b8b8b8b8b8b8b8b8b8b8b",
    "username": "john_doe",
    "email": "john.doe@example.com"
  }
  ```

### Swagger Documentation

Access the full API documentation at:

```
http://localhost:8080/api-docs
```

**Note:** Swagger UI provides interactive API testing capabilities, allowing developers to try out endpoints directly within the browser.

---

## Project Structure

```
src
├── db
│   └── mongoose.js
├── email
│   └── email.js
├── middleware
│   └── auth.js
├── models
│   └── userModel.js
├── routes
│   └── userRoute.js
└── index.js
```

---

## Contributing

Feel free to fork this repository and submit pull requests. Ensure your code is properly documented and tested before submission.

---
