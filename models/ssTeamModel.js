import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    specialties: { type: String, required: true },
    joined: { type: String, required: true },
    img: { type: String }, // cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("SSTeam", teamMemberSchema);
