import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./middlewares/db.js";
import connectCloudinary from "./middlewares/cloudinary.js";

// Routes
import activityRoutes from "./routers/activityRoutes.js";
import eventRoutes from "./routers/eventRouter.js";
import galleryRoutes from "./routers/galleryRoutes.js";
import scTeamRoutes from "./routers/scTeamRoutes.js";
import projectRoutes from "./routers/projectRoutes.js";
import ssTeamRoutes from "./routers/ssTeamRoutes.js";
import announcementRoutes from "./routers/announcementRoutes.js";
import applyRoutes from "./routers/applyRoutes.js";
import contactRoutes from "./routers/contactRoutes.js";
import ambassadorRoutes from "./routers/ambassadorRoutes.js";
import contactSSRoutes from "./routers/contactSSRoutes.js";
import authRoutes from "./routers/auth.js";
import careerRoutes from "./routers/careerRoutes.js";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARES ---------- */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ---------- INIT ---------- */
connectDB();
connectCloudinary();

/* ---------- ROUTES ---------- */
app.use("/api/activities", activityRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/scteam", scTeamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ssteam", ssTeamRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/application", applyRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ambassador", ambassadorRoutes);
app.use("/api/contactSS", contactSSRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);

/* ---------- DEFAULT ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
