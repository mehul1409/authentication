const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const { authMiddleware } = require("../middleware/auth.middleware")
const { upload } = require("../middleware/upload.middleware")

// All routes require authentication
router.use(authMiddleware)

// Get user profile
router.get("/profile", userController.getProfile)

// Update user profile
router.put("/profile", userController.updateProfile)

// Upload profile picture
router.post("/profile/picture", upload.single("profilePicture"), userController.uploadProfilePicture)

// Delete user account
router.delete("/profile", userController.deleteAccount)

module.exports = router

