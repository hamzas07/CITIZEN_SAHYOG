const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleWares");
const { createComplaint } = require("../controllers/complaintController");

router.post("/create", protect, createComplaint);

module.exports = router;
