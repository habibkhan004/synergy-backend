import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link:{ type: String },
    image: { type: String }, // optional image
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
