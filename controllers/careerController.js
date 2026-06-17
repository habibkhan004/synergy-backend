import Career from "../models/careerModel.js";
import { v2 as cloudinary } from "cloudinary";

export const submitCareerApplication = async (req, res) => {
  try {
    const { name, fatherName, phone, linkedin, github, degree, role, experience, anyExperience } = req.body;

    if (!name || !fatherName || !phone || !degree || !role || !experience) {
      return res.status(400).json({ success: false, message: "Please fill all required fields." });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "CV file is required." });
    }

    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "careers/cvs",
      format: "pdf",
    });

    const application = await Career.create({
      name, fatherName, phone, linkedin, github, degree,
      role, experience, anyExperience,
      cvUrl: uploaded.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully! We will get back to you soon.",
      application,
    });
  } catch (error) {
    console.error("CAREER SUBMIT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCareerApplications = async (req, res) => {
  try {
    const applications = await Career.find().sort({ createdAt: -1 });
    res.json({ success: true, applications });
  } catch (error) {
    console.error("GET CAREERS ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCareerApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Career.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }
    res.json({ success: true, message: "Application deleted successfully." });
  } catch (error) {
    console.error("DELETE CAREER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
