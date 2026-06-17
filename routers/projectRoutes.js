import express from "express";
import upload from "../middlewares/multer.js";
import { createProject, getProjects } from "../controllers/projectController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createProject);
router.get("/all", getProjects);

export default router;
