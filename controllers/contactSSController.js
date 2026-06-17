import ContactSSMessage from "../models/contactSSModel.js";

// Create a new contact message
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Name, Email, and Message are required" });
    }

    const contact = await ContactSSMessage.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      data: contact,
    });
  } catch (err) {
    console.error("CREATE CONTACT MESSAGE ERROR:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again later." });
  }
};

// Get all contact messages (for admin)
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactSSMessage.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: messages });
  } catch (err) {
    console.error("GET CONTACT MESSAGES ERROR:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again later." });
  }
};
