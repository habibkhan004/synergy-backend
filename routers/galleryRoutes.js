import express from "express";
import { createGallery, getAllGalleries } from "../controllers/galleryController.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createGallery);
router.get("/", getAllGalleries);

export default router;
