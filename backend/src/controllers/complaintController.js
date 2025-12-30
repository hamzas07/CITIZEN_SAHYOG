const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    console.log(req.user);

    const media = req.files
      ? req.files.map(file => ({
          url: file.path,
          type: file.mimetype.startsWith("video") ? "video" : "image"
        }))
      : [];

    const complaint = await Complaint.create({
      user: req.user.userId, // ✅ FIXED
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      media
    });

    res.status(201).json({
      message: "Complaint created",
      complaint
    });

  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);
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

const likeComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const userId = req.user.userId;

    if (complaint.likes.includes(userId)) {
      complaint.likes = complaint.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      complaint.likes.push(userId);
    }

    await complaint.save();

    res.status(200).json({
      message: "Like status updated",
      likesCount: complaint.likes.length
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.comments.push({
      user: req.user.userId,
      text
    });

    await complaint.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: complaint.comments
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = { createComplaint,getAllComplaints,getMyComplaints,likeComplaint,addComment };