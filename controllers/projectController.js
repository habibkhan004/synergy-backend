import Project from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createProject = async (req, res) => {
  try {
    console.log("PROJECT API HIT");
    let imageUrl = "";

    // Upload to Cloudinary if image included
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "synergy-innovations/projects",
      });

      imageUrl = uploadResult.secure_url;
    }

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      tech: req.body.tech,
      link: req.body.link,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
