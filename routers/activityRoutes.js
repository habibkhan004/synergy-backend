import express from "express";
import upload from "../middlewares/multer.js";
import { createActivity, getAllActivities } from "../controllers/activityController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, (req, res, next) => {
  console.log("Route /add hit");
  next();
}, upload.single("image"), createActivity);

router.get("/", getAllActivities);

export default router;
