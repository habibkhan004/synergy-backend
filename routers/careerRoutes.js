import express from "express";
import { submitCareerApplication, getAllCareerApplications, deleteCareerApplication } from "../controllers/careerController.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", upload.single("cv"), submitCareerApplication);
router.get("/", authMiddleware, getAllCareerApplications);
router.delete("/:id", authMiddleware, deleteCareerApplication);

export default router;
