const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleWares");
const upload = require("../middlewares/uploadMiddleware");

const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  likeComplaint,
  addComment
} = require("../controllers/complaintController");

// Public feed
router.get("/", getAllComplaints);

// User dashboard
router.get("/my", protect, getMyComplaints);

// Create complaint
router.post(
  "/create",
  protect,
  upload.array("media", 5),
  createComplaint
);

// Like / Unlike
router.patch("/like/:id", protect, likeComplaint);

// Comment
router.post("/comment/:id", protect, addComment);

module.exports = router;
