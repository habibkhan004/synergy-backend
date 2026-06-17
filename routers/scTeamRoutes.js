import express from "express";
import { addTeamMember, getAllTeamMembers, deleteTeamMember, updateTeamMember } from "../controllers/scTeamController.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, upload.single("image"), addTeamMember);
router.get("/all", getAllTeamMembers);
router.delete("/:id", authMiddleware, deleteTeamMember);
router.put("/:id", authMiddleware, upload.single("image"), updateTeamMember);

export default router;
