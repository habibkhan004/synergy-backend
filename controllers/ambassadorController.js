import Volunteer from "../models/ambassadorModel.js";

// Create a new volunteer submission
export const createVolunteer = async (req, res) => {
  try {
    const { name, email, whatsapp } = req.body;

    // Validate required fields
    if (!name || !email || !whatsapp) {
      return res.status(400).json({ message: "Name, Email and WhatsApp are required" });
    }

    const volunteer = await Volunteer.create(req.body);
    return res.status(201).json({ success: true, data: volunteer });
  } catch (err) {
    console.error("CREATE VOLUNTEER ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all volunteer submissions
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: volunteers });
  } catch (err) {
    console.error("GET VOLUNTEERS ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
