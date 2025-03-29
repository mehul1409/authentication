const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")

// Load environment variables
dotenv.config()

// Import routes
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const adminRoutes = require("./routes/admin.routes")

const  connectDB  = require("./config/db.js")

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

