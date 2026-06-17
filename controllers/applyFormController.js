import Application from "../models/applyFormModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const submitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      institution,
      city,
      fieldOfStudy,
      classSemester,
      knowSSC,
      courseId,
    } = req.body;

    let receiptFileUrl = null;

    // ⭐ Upload receipt to Cloudinary if exists
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "synergy/receipts",
        resource_type: "auto", // supports pdf, jpg, png
      });

      receiptFileUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path); // delete temp file
    }

    const application = await Application.create({
      courseId,
      name,
      email,
      phone,
      institution,
      city,
      fieldOfStudy,
      classSemester,
      knowSSC,
      receiptFile: receiptFileUrl,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.log("SUBMIT APPLICATION ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getApplicationsByActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const applications = await Application.find({ courseId: activityId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log("FETCH APPLICATIONS ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};