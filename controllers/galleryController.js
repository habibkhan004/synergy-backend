import { Gallery } from "../models/galleryModel.js";
import {v2 as cloudinary} from "cloudinary";

export const createGallery = async (req, res) => {
  try {


    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }


    // Upload image to Cloudinary
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "synergy-gallery",
      resource_type: "image",
    });

    const imageUrl = upload.secure_url;

    const newImage = await Gallery.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      location: req.body.location,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully",
      data: newImage,
    });

  } catch (error) {
    console.log("❌ CREATE GALLERY ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllGalleries = async (req, res) => {   
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: galleries,
    });
  } catch (error) {
    console.log("❌ GET ALL GALLERIES ERROR:", error);
    return res.status(500).json({ message: error.message });
  }   
}
