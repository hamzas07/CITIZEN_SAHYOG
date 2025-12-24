const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleWares");
const { createComplaint,getAllComplaints,getMyComplaints } = require("../controllers/complaintController");



// Public feed
router.get("/", getAllComplaints);

// User dashboard
router.get("/my", protect, getMyComplaints);

router.post("/create", protect, createComplaint);


module.exports = router;
