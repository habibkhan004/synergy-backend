import Contact from "../models/contactModel.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, company, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, Email, and Message are required"
      });
    }

    const contact = await Contact.create({
      name,
      email,
      company,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact
    });
  } catch (error) {
    console.error("CONTACT SUBMIT ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 🔐 Admin – fetch all messages
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      contacts
    });
  } catch (error) {
    console.error("GET CONTACTS ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
