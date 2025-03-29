# User Management Application

This is a comprehensive authentication application built with Node.js and Express. It provides functionalities for user registration, login, email verification, password management, profile management (basic), and administrative user management.

## Features

* User Registration with email verification (OTP).
* User Login and Logout.
* Resend OTP for email verification.
* Forgot Password and Reset Password functionality.
* Basic Profile retrieval, update, picture upload (implementation details for picture upload are not in the provided files, so this is a placeholder).
* User Profile deletion.
* Admin routes for managing users (view, update, delete).
* Secure password encryption.
* Authentication and Authorization middleware.

## Technologies Used

* Node.js
* Express.js
* MongoDB (assumed based on `connectDB()`)
* dotenv
* cors
* cookie-parser

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:mehul1409/authentication.git
    cd authentication
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add your environment variables (e.g., MongoDB connection string, JWT secret, email configuration, etc.). Refer to the `.env.example` file (if you have one) or the code for the necessary variables.

4.  **Run the application:**
    ```bash
    npm start
    ```

    The server will start on the port specified in your `.env` file (or 5000 by default).

## API Documentation

For detailed information about the API endpoints, please refer to the [API Documentation](Docs/api_documentation.md).


# User Management API

This document describes the environment variables required to run the User Management API.

## Server

| Variable    | Description                               | Example               |
| :---------- | :---------------------------------------- | :-------------------- |
| `PORT`      | The port the server listens on.           | `5000`                |
| `NODE_ENV`  | The environment the application is running in. | `development`         |

## MongoDB

| Variable      | Description                               | Example                                  |
| :------------ | :---------------------------------------- | :--------------------------------------- |
| `MONGODB_URI` | The URI for connecting to the MongoDB database. | `mongodb://localhost:27017/user-management` |

## JWT

| Variable    | Description                              | Example          |
| :---------- | :--------------------------------------- | :--------------- |
| `JWT_SECRET` | Secret key used for JWT signing.         | `your_secret_key` |

## Email

| Variable       | Description                                  | Example                       |
| :------------- | :------------------------------------------- | :---------------------------- |
| `EMAIL_HOST`   | The hostname of the email server.            | `smtp.gmail.com`              |
| `EMAIL_PORT`   | The port of the email server.                | `587`                         |
| `EMAIL_USER`   | The username for the email account.          | `your_email@example.com`      |
| `EMAIL_PASSWORD` | The password for the email account.          | `your_email_password`         |
| `EMAIL_FROM`   | The email address used as the sender.        | `your_email@example.com`      |
| `EMAIL_SECURE` | Whether to use secure connection (e.g., TLS). | `false`                       |

## Cloudinary

| Variable                | Description                            | Example             |
| :---------------------- | :------------------------------------- | :------------------ |
| `CLOUDINARY_CLOUD_NAME` | The Cloudinary Cloud Name.             | `your_cloud_name`   |
| `CLOUDINARY_API_KEY`    | The Cloudinary API Key.                | `your_api_key`      |
| `CLOUDINARY_API_SECRET` | The Cloudinary API Secret.             | `your_api_secret` |


