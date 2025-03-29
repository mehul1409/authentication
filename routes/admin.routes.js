const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin.controller")
const { authMiddleware, adminMiddleware } = require("../middleware/auth.middleware")

// All routes require authentication and admin role
router.use(authMiddleware)
router.use(adminMiddleware)

// Get all users
router.get("/users", adminController.getAllUsers)

// Get user by ID
router.get("/user/:id", adminController.getUserById)

// Update user
router.put("/user/:id", adminController.updateUser)

// Delete user
router.delete("/user/:id", adminController.deleteUser)

module.exports = router

