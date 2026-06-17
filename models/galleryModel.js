import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true }, // final cloudinary URL
}, { timestamps: true });

export const Gallery = mongoose.model("Gallery", gallerySchema);
