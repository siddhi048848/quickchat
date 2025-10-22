import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getUsersForSidebar, getMessagesForChat, markMessagesAsSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessagesForChat);
messageRouter.put("/mark/:id", protectRoute, markMessagesAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;