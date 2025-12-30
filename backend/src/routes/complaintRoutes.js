const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleWares");
const { createComplaint,getAllComplaints,getMyComplaints,likeComplaint,addComment } = require("../controllers/complaintController");
const {isAdmin,updateStatus}=require("../middlewares/adminMiddleware");
const upload = require("../middlewares/uploadMiddleware");



router.patch("/like/:id", protect, likeComplaint);
router.post("/comment/:id", protect, addComment);
router.patch("/status/:id", protect, isAdmin, updateStatus);


// Public feed
router.get("/", getAllComplaints);

// User dashboard
router.get("/my", protect, getMyComplaints);

router.post(
  "/create",
  protect,
  upload.array("media", 5),
  createComplaint
);


module.exports = router;
