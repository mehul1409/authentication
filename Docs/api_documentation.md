# API Documentation

This document provides a detailed description of the API endpoints available in the authentication application.

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

Most user-related endpoints require authentication using a token (likely a JWT) sent in the `Authorization` header (e.g., `Bearer <token>`). Admin-related endpoints require both authentication and admin privileges.

## Endpoints

### 1. Authentication (`/api/auth`)

#### 1.1. Register User (`POST /api/auth/register`)

* **Description:** Registers a new user.
* **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
* **Response (Success - 201 Created):**
    ```json
    {
      "message": "Registration successful. Please verify your email."
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "string" // Error message (e.g., email already exists, invalid input)
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 1.2. Verify Email OTP (`POST /api/auth/verify-otp`)

* **Description:** Verifies the OTP sent to the user's email.
* **Request Body:**
    ```json
    {
      "email": "string",
      "otp": "string"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Email verified successfully."
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "string" // Error message (e.g., invalid OTP, OTP expired)
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 1.3. Resend OTP (`POST /api/auth/resend-otp`)

* **Description:** Resends the OTP to the user's email.
* **Request Body:**
    ```json
    {
      "email": "string"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "OTP resent successfully."
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "string" // Error message (e.g., account already verified)
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 1.4. Login User (`POST /api/auth/login`)

* **Description:** Logs in an existing user.
* **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Login successful.",
      "token": "string" // Authentication token (e.g., JWT)
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "string" // Error message (e.g., account not verified)
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 1.5. Logout User (`POST /api/auth/logout`)

* **Description:** Logs out the currently authenticated user.
* **Request Headers:** Requires an authentication token (e.g., in the `Authorization` header).
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Logout successful."
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 1.6. Forgot Password (`POST /api/auth/forgot-password`)

* **Description:** Initiates the forgot password process by sending a reset OTP to the user's email.
* **Request Body:**
    ```json
    {
      "email": "string"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Password reset OTP sent to your email."
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 1.7. Reset Password (`POST /api/auth/reset-password`)

* **Description:** Resets the user's password using the reset OTP.
* **Request Body:**
    ```json
    {
      "email": "string",
      "otp": "string",
      "newPassword": "string"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Password reset successfully."
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "string" // Error message (e.g., invalid OTP, OTP expired)
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

### 2. User (`/api/user`)

**(Note: The provided code snippets do not include the specific routes and controller logic for `/api/user`. Based on your description, these routes likely handle profile management. Here's a placeholder assuming standard RESTful practices.)**

#### 2.1. Get Profile (`GET /api/user/profile`)

* **Description:** Retrieves the profile of the authenticated user.
* **Request Headers:** Requires an authentication token.
* **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "address": "string",
      // ... other profile fields
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 2.2. Update Profile (`PUT /api/user/profile`)

* **Description:** Updates the profile of the authenticated user.
* **Request Headers:** Requires an authentication token.
* **Request Body:**
    ```json
    {
      "name": "string",
      "address": "string",
      // ... other fields to update
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Profile updated successfully.",
      "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "address": "string",
        // ... updated profile fields
        "createdAt": "string",
        "updatedAt": "string"
      }
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "string" // Error message (e.g., invalid input)
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 2.3. Upload Profile Picture (`POST /api/user/profile/picture`)

* **Description:** Uploads a profile picture for the authenticated user.
* **Request Headers:** Requires an authentication token and likely `Content-Type: multipart/form-data`.
* **Request Body:** Form data containing the image file (details depend on your implementation).
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Profile picture uploaded successfully.",
      "imageUrl": "string" // URL of the uploaded image
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 2.4. Delete Profile (`DELETE /api/user/profile`)

* **Description:** Deletes the profile of the authenticated user.
* **Request Headers:** Requires an authentication token.
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "Profile deleted successfully."
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error"
    }
    ```

### 3. Admin (`/api/admin`)

**(Note: All these routes require both authentication and admin privileges.)**

#### 3.1. Get All Users (`GET /api/admin/users`)

* **Description:** Retrieves a list of all users.
* **Request Headers:** Requires an authentication token and admin role.
* **Response (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "string",
        "address": "string",
        "createdAt": "string",
        "updatedAt": "string"
      },
      // ... more users
    ]
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 403 Forbidden):**
    ```json
    {
      "message": "Forbidden - Admin access required"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error while fetching users"
    }
    ```

#### 3.2. Get User by ID (`GET /api/admin/user/:id`)

* **Description:** Retrieves a specific user by their ID.
* **Request Headers:** Requires an authentication token and admin role.
* **Path Parameter:**
    * `id`: The ID of the user to retrieve.
* **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "address": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 403 Forbidden):**
    ```json
    {
      "message": "Forbidden - Admin access required"
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error while fetching user"
    }
    ```

#### 3.3. Update User (`PUT /api/admin/user/:id`)

* **Description:** Updates a specific user by their ID.
* **Request Headers:** Requires an authentication token and admin role.
* **Path Parameter:**
    * `id`: The ID of the user to update.
* **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "address": "string",
      "role": "string"
    }
    ```
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "User updated successfully",
      "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "string",
        "address": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 403 Forbidden):**
    ```json
    {
      "message": "Forbidden - Admin access required"
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error while updating user"
    }
    ```

#### 3.4. Delete User (`DELETE /api/admin/user/:id`)

* **Description:** Deletes a specific user by their ID.
* **Request Headers:** Requires an authentication token and admin role.
* **Path Parameter:**
    * `id`: The ID of the user to delete.
* **Response (Success - 200 OK):**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```
* **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
* **Response (Error - 403 Forbidden):**
    ```json
    {
      "message": "Forbidden - Admin access required"
    }
    ```
* **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
* **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "message": "Server error while deleting user"
    }
    ```

## Database Model

### User Model

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
  resetOtp: String,
  resetOtpExpiry: Date,
  address: String,
  // ... other fields like profile picture URL might be here
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);