import Event from "../models/eventModel.js";
import {v2 as cloudinary} from "cloudinary";

export const createEvent = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image file missing" });
    }

    // Upload to Cloudinary
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "synergy-innovations/events",
      resource_type: "image",
    });

    const imageUrl = uploaded.secure_url;

    // Create event in DB
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      event,
    });
  } catch (error) {
    console.error("EVENT CREATE ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
