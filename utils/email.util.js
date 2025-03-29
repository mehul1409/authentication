const nodemailer = require("nodemailer")

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Generate 6-digit OTP
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP email for verification
exports.sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"User Management API" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Email Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Hello ${name},</p>
        <p>Thank you for registering. Please use the following OTP to verify your email address:</p>
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Regards,<br>User Management API Team</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

// Send password reset OTP email
exports.sendPasswordResetEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"User Management API" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">Password Reset</h2>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Please use the following OTP to reset your password:</p>
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email or contact support if you're concerned.</p>
        <p>Regards,<br>User Management API Team</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

