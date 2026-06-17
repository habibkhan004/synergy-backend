import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  name: String,
  email: String,
  phone: String,
  institution: String,
  city: String,
  fieldOfStudy: String,
  classSemester: String,
  knowSSC: String,
  receiptFile: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Application", applicationSchema);
