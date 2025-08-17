import User from "../models/user.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Request password reset - sends email with reset token
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email (use username instead if your app uses username for login)
    const user = await User.findOne({ email });
    
    // Don't reveal whether a user was found or not (security best practice)
    if (!user) {
      return res.status(200).json({ 
        message: "If an account with that email exists, we've sent password reset instructions" 
      });
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save token and expiry to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@chatapp.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h1>You requested a password reset</h1>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
        <p>This link is valid for 1 hour</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "If an account with that email exists, we've sent password reset instructions" 
    });
  } catch (error) {
    console.error("Error in forgotPassword controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reset password using token
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find user with valid token and non-expired token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Token must not be expired
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
