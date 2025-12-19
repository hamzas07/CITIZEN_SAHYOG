require('dotenv').config();

const express = require('express');
const connectdb = require('./config/db');
const app = express();

connectdb();

app.get("/health", (req, res) => {
    res.send("Citizen Sahyog Backend is running");
});

const PORT = process.env.PORT || 7878;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
