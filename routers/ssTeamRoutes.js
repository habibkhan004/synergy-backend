import express from "express";
import upload from "../middlewares/multer.js";
import { addTeamMember, getAllTeamMembers, deleteTeamMember, updateTeamMember } from "../controllers/ssTeamController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-member", authMiddleware, upload.single("img"), addTeamMember);
router.get("/all", getAllTeamMembers);
router.delete("/:id", authMiddleware, deleteTeamMember);
router.put("/:id", authMiddleware, upload.single("img"), updateTeamMember);

export default router;
