import mongoose from "mongoose";

const ambassadorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    fatherName: { type: String },
    gender: { type: String },
    whatsapp: { type: String, required: true },
    university: { type: String },
    semester: { type: String },
    department: { type: String },
    linkedin: { type: String },
    experience: { type: String },
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Ambassador", ambassadorSchema);
export default Volunteer;
