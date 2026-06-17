import Activity from "../models/activityModel.js";
import { v2 as cloudinary } from "cloudinary";
export const createActivity = async (req, res) => {

  try {
    // Get uploaded image URL from Multer/Cloudinary or fallback to req.body.image
    const imageFile = req.file;

    const imageUploaded = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUploaded.secure_url
  


    // Validate required fields
    const { title, instructor, description, location, startDate, endDate, applicationDeadline, paid } = req.body;
    if (!title || !instructor || !description || !location || !startDate || !endDate || !applicationDeadline) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Create the activity
    const activity = await Activity.create({
      title,
      instructor,
      description,
      location,
      startDate,
      endDate,
      applicationDeadline,
      paid: paid === "true" || paid === true,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      activity,
    });
  } catch (error) {
    console.error("CREATE ACTIVITY ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message || JSON.stringify(error),
    });
  }
};

export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json({ success: true, activities });
  } catch (error) {
    console.error("GET ACTIVITIES ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
