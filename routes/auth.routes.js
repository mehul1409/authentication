const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")

// Register a new user
router.post("/register", authController.register)

// Verify email OTP
router.post("/verify-otp", authController.verifyOTP)

// Resend OTP
router.post("/resend-otp", authController.resendOTP)

// Login user
router.post("/login", authController.login)

// Logout user
router.post("/logout", authController.logout)

// Forgot password
router.post("/forgot-password", authController.forgotPassword)

// Reset password
router.post("/reset-password", authController.resetPassword)

module.exports = router

