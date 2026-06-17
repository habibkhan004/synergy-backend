import SCTeam from "../models/scTeamModel.js";
import {v2 as cloudinary} from "cloudinary";

export const addTeamMember = async (req, res) => {
  try {
    console.log("TEAM MEMBER API HIT");

    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Image is required",
      });
    }

    // Upload to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "synergy-innovations/team",
    });

    const imageUrl = uploadedImage.secure_url;

    // Create team member
    const member = await SCTeam.create({
      name: req.body.name,
      role: req.body.role,
      session: req.body.session,
      type: req.body.type,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Team member added successfully",
      member,
    });
  } catch (error) {
    console.error("ADD TEAM MEMBER ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};

export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await SCTeam.find().sort({ createdAt: -1 });
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const member = await SCTeam.findById(req.params.id);    
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }   
    await SCTeam.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Team member deleted successfully" });
  } catch (error) {
    console.error("DELETE TEAM MEMBER ERROR:", error);
    res.status(500).json({    
      success: false,
      error: error.message || "Server Error",
    });
  }
};
export const updateTeamMember = async (req, res) => {
  try {
    const member = await SCTeam.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    } 
    let imageUrl = member.image; // Default to existing image URL
    // If a new image is uploaded, upload it to Cloudinary

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "synergy-innovations/team", 
      });
      imageUrl = uploadedImage.secure_url;
    } 
    // Update member details
    member.name = req.body.name || member.name;
    member.role = req.body.role || member.role;
    member.session = req.body.session || member.session;
    member.type = req.body.type || member.type;
    member.image = imageUrl;        
    await member.save();
    res.json({
      success: true,  
      message: "Team member updated successfully",
      member,
    });
  } catch (error) {
    console.error("UPDATE TEAM MEMBER ERROR:", error);
    res.status(500).json({    
      success: false,
      error: error.message || "Server Error",
    });
  }
};