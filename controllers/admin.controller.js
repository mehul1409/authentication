const User = require("../models/user.model")

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Get all users
    const users = await User.find().select("-password -otp -otpExpiry -resetOtp -resetOtpExpiry")

    res.status(200).json(users)
  } catch (error) {
    console.error("Get all users error:", error)
    res.status(500).json({ message: "Server error while fetching users" })
  }
}

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id

    // Find user by ID
    const user = await User.findById(userId).select("-password -otp -otpExpiry -resetOtp -resetOtpExpiry")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Get user by ID error:", error)
    res.status(500).json({ message: "Server error while fetching user" })
  }
}

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const { name, email, address, role } = req.body

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name || undefined,
          email: email || undefined,
          address: address || undefined,
          role: role || undefined,
        },
      },
      { new: true },
    ).select("-password -otp -otpExpiry -resetOtp -resetOtpExpiry")

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({ message: "Server error while updating user" })
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ message: "Server error while deleting user" })
  }
}

