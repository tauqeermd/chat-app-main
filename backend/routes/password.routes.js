import express from "express";
import { forgotPassword, resetPassword } from "../controller/password.controller.js";

const router = express.Router();

// Route for requesting password reset (sends email)
router.post("/forgot-password", forgotPassword);

// Route for resetting password with token
router.post("/reset-password", resetPassword);

export default router;
