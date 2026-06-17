import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    session: { type: String, required: true },
    type: { type: String, enum: ["current", "senior"], required: true },
    image: { type: String, required: true }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("SCTeam", teamSchema);
