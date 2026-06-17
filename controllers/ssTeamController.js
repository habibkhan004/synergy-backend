import SSTeamMember from "../models/ssTeamModel.js";
import { v2 as cloudinary } from "cloudinary";

// ADD TEAM MEMBER (same)
export const addTeamMember = async (req, res) => {
  try {

    let imageUrl = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "synergy-innovations/team",
      });

      imageUrl = uploadResult.secure_url;
    }

    const newMember = await SSTeamMember.create({
      name: req.body.name,
      role: req.body.role,
      specialties: req.body.specialties,
      joined: req.body.joined,
      img: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Team member added successfully",
      member: newMember,
    });
  } catch (error) {
    console.error("ADD MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET ALL TEAM MEMBERS (same)
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await SSTeamMember.find().sort({ createdAt: -1 });
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }     
};

// DELETE TEAM MEMBER (image deletion kept)
export const deleteTeamMember = async (req, res) => {
  try {
    const member = await SSTeamMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    // Delete cloudinary image
    if (member.img) {
      const publicId = member.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`synergy-innovations/team/${publicId}`);
    }

    await SSTeamMember.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      success: true, 
      message: "Team member deleted successfully" 
    });
  } catch (error) {
    console.error("DELETE MEMBER ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE TEAM MEMBER (image NOT updated)
export const updateTeamMember = async (req, res) => {
  try {
    const member = await SSTeamMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    // Ignore req.file completely
    // Do NOT change member.img
    const updatedMember = await SSTeamMember.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || member.name,
        role: req.body.role || member.role,
        specialties: req.body.specialties || member.specialties,
        joined: req.body.joined || member.joined,
        img: member.img   // always keep old image
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("UPDATE MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
