import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import protectRoute from "../middleware/protecRoute.js";

const router = express.Router();
// route for sending messages
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);  // sendMessage: controller for sending messages



export default router;