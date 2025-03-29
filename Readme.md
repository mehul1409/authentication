# Authentication Application

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
    git clone <your_repository_url>
    cd <your_project_directory>
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

## Contributing

[Optional: Add your contributing guidelines here]

## License

[Optional: Add your license information here]