import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    degree: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Frontend Developer", "Backend Developer", "AI / Machine Learning"],
    },
    experience: {
      type: String,
      required: true,
      enum: ["0-6 months", "6-12 months", "1-2 years", "2-3 years", "3-4 years", "4-5 years"],
    },
    anyExperience: { type: String },
    cvUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Career", careerSchema);
