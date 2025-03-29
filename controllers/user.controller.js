const User = require("../models/user.model")
const { uploadImage } = require("../utils/cloudinary.util")

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    // User ID is available from auth middleware
    const userId = req.user.id

    // Find user by ID
    const user = await User.findById(userId).select("-password -otp -otpExpiry -resetOtp -resetOtpExpiry")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ message: "Server error while fetching profile" })
  }
}

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    // User ID is available from auth middleware
    const userId = req.user.id
    const { name, address, bio } = req.body

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name || undefined,
          address: address || undefined,
          bio: bio || undefined,
        },
      },
      { new: true },
    ).select("-password -otp -otpExpiry -resetOtp -resetOtpExpiry")

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Server error while updating profile" })
  }
}

// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    // User ID is available from auth middleware
    const userId = req.user.id

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" })
    }

    // Upload to Cloudinary
    const result = await uploadImage(req.file.path, `profile-pictures/${userId}`)

    // Update user with profile picture URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true },
    ).select("-password -otp -otpExpiry -resetOtp -resetOtpExpiry")

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Upload profile picture error:", error)
    res.status(500).json({ message: "Server error while uploading profile picture" })
  }
}

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    // User ID is available from auth middleware
    const userId = req.user.id

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
    })

    res.status(200).json({ message: "Account deleted successfully" })
  } catch (error) {
    console.error("Delete account error:", error)
    res.status(500).json({ message: "Server error while deleting account" })
  }
}

