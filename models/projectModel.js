import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tech: { type: String, required: true },
    link: { type: String },
    image: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
