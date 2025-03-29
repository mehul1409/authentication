const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { generateOTP, sendOTPEmail, sendPasswordResetEmail } = require("../utils/email.util")

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" })
    }

    // Generate OTP
    const otp = generateOTP()
    const otpExpiry = new Date()
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10) // OTP valid for 10 minutes

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      otp,
      otpExpiry,
      isVerified: false,
    })

    await newUser.save()

    // Send OTP email
    await sendOTPEmail(email, otp, name)

    res.status(201).json({ message: "User registered successfully. Please verify your email with the OTP sent." })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error during registration" })
  }
}

// Verify email OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if OTP is valid and not expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" })
    }

    // Mark user as verified
    user.isVerified = true
    user.otp = undefined
    user.otpExpiry = undefined
    await user.save()

    res.status(200).json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("OTP verification error:", error)
    res.status(500).json({ message: "Server error during OTP verification" })
  }
}

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate new OTP
    const otp = generateOTP()
    const otpExpiry = new Date()
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10) // OTP valid for 10 minutes

    // Update user with new OTP
    user.otp = otp
    user.otpExpiry = otpExpiry
    await user.save()

    // Send OTP email
    await sendOTPEmail(email, otp, user.name)

    res.status(200).json({ message: "OTP resent successfully" })
  } catch (error) {
    console.error("Resend OTP error:", error)
    res.status(500).json({ message: "Server error during OTP resend" })
  }
}

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email before logging in" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production",
    })

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error during login" })
  }
}

// Logout user
exports.logout = (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
    })

    res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({ message: "Server error during logout" })
  }
}

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate reset OTP
    const otp = generateOTP()
    const otpExpiry = new Date()
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10) // OTP valid for 10 minutes

    // Update user with reset OTP
    user.resetOtp = otp
    user.resetOtpExpiry = otpExpiry
    await user.save()

    // Send password reset email
    await sendPasswordResetEmail(email, otp, user.name)

    res.status(200).json({ message: "Password reset OTP sent to your email" })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({ message: "Server error during password reset request" })
  }
}

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body

    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP and new password are required" })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if reset OTP is valid and not expired
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    if (user.resetOtpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update user password and clear reset OTP
    user.password = hashedPassword
    user.resetOtp = undefined
    user.resetOtpExpiry = undefined
    await user.save()

    res.status(200).json({ message: "Password reset successful" })
  } catch (error) {
    console.error("Reset password error:", error)
    res.status(500).json({ message: "Server error during password reset" })
  }
}

