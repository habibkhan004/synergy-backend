import mongoose from "mongoose";

const contactSSSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    service: { type: String },
    budget: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactSSMessage = mongoose.model("ContactMessage", contactSSSchema);
export default ContactSSMessage;
