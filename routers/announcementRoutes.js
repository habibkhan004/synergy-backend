import express from "express";
import { createAnnouncement, getAllAnnouncements, deleteAnnouncement } from "../controllers/announcementController.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createAnnouncement);
router.get("/", getAllAnnouncements);
router.delete("/:id", authMiddleware, deleteAnnouncement);

export default router;
