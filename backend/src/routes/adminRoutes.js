const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleWares");
const adminOnly = require("../middlewares/adminMiddleware");

const {
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  blockUser
} = require("../controllers/adminController");

// View all complaints
router.get("/complaints", protect, adminOnly, getAllComplaints);

// Update complaint status
router.put(
  "/complaints/:id/status",
  protect,
  adminOnly,
  updateComplaintStatus
);

// Delete complaint
router.delete(
  "/complaints/:id",
  protect,
  adminOnly,
  deleteComplaint
);

// Block user
router.put(
  "/users/:id/block",
  protect,
  adminOnly,
  blockUser
);

module.exports = router;
