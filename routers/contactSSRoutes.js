import { createContactMessage, getAllContactMessages } from "../controllers/contactSSController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/create", createContactMessage);
router.get("/", authMiddleware, getAllContactMessages);

export default router;
