import Announcement from "../models/announcementModel.js";
import { v2 as cloudinary } from "cloudinary";

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const imageFile = req.file;
    const imageUrl = imageFile
      ? (await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })).secure_url
      : req.body.image; // fallback to URL from body

    const { title, description, date, link } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, error: "Title and description are required" });
    }

    const announcement = await Announcement.create({
      title,
      description,
      link,
      image: imageUrl,
      date: date || Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error("CREATE ANNOUNCEMENT ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error("GET ANNOUNCEMENTS ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete an announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({ success: false, error: "Announcement not found." });
    }
    res.json({ success: true, message: "Announcement deleted successfully." });
  } catch (error) {
    console.error("DELETE ANNOUNCEMENT ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
