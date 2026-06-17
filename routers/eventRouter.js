import express from "express";
import upload from "../middlewares/multer.js";
import { createEvent, getAllEvents } from "../controllers/eventController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, upload.single("image"), createEvent);
router.get("/", getAllEvents);

export default router;
