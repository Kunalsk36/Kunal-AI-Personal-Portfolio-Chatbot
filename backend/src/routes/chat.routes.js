import { Router } from "express";
import { createChat } from "../controllers/chat.controller.js";

const router = Router();

router.post("/chat", createChat);

export default router;

