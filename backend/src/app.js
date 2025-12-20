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

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 7878;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
