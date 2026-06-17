import express from "express";
import { submitContactForm, getAllContacts } from "../controllers/contactController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit", submitContactForm);
router.get("/", authMiddleware, getAllContacts);

export default router;
