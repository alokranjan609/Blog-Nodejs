# Blog Website

## Description

This is a full-featured blog website that allows users to register, log in, create posts, comment on posts, and view posts from other users. The backend is built with Node.js, and it uses JWT tokens for authentication and salted and hashed passwords for secure password storage.

## Features

- User authentication with JWT tokens
- Express-rate-limit is implemented to limit the number of requests a client can make .
- Secure password storage with salted and hashed passwords
- User registration and login
- Create, read, update, and delete (CRUD) operations for blog posts
- Commenting on posts

## Technologies Used

- **Backend**: Node.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**:Hashing
- **Database**: MongoDB

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
```env
PORT=your_port
DB_URI=your_database_uri
JWT_SECRET=your_jwt_secret
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/alokranjan609/Blog-Nodejs.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Blog-Nodejs
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the server:
     ```bash
     npm run dev
     ```






