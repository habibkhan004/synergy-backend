import express from "express";
import { createVolunteer, getVolunteers } from "../controllers/ambassadorController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createVolunteer);
router.get("/", authMiddleware, getVolunteers);

export default router;
