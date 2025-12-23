require('dotenv').config();

const express = require('express');
const connectdb = require('./config/db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectdb();

app.get("/health", (req, res) => {
    res.send("Citizen Sahyog Backend is running");
});

const protect = require("./middlewares/authMiddleWares");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT || 7878;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
