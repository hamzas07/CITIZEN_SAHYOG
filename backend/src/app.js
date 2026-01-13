require("dotenv").config();

const express = require("express");
const connectdb = require("./config/db");
const cors = require("cors");

const app = express();

// ✅ CRITICAL: CORS must be BEFORE express.json()
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'https://citizen-sahyog-platform.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000'
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('Blocked origin:', origin); // Debug log
        callback(null, true); // Allow anyway for now to test
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // 24 hours
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectdb();

app.get("/health", (req, res) => {
  res.send("Citizen Sahyog Backend is running");
});

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 7878;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});