const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

// Authentication middleware
exports.authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies or authorization header
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null)

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user by ID
    const user = await User.findById(decoded.id).select("-password")
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" })
    }

    // Add user to request object
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    }

    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    return res.status(401).json({ message: "Unauthorized - Invalid token" })
  }
}

// Admin middleware
exports.adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    return res.status(403).json({ message: "Forbidden - Admin access required" })
  }
}

