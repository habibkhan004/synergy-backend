import express from "express";
import upload from "../middlewares/multer.js";
import { submitApplication, getApplicationsByActivity } from "../controllers/applyFormController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", upload.single("receiptFile"), submitApplication);
router.get("/activity/:activityId", authMiddleware, getApplicationsByActivity);

export default router;
