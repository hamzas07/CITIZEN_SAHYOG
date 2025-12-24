const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const { title, description, category,media, location } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const complaint = await Complaint.create({
      user: req.user.userId,
      title,
      description,
      category,
      media,
      location
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.userId
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createComplaint,getAllComplaints,getMyComplaints };