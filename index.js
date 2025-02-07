require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const multer = require("multer");

connectDB();

const app = express();
app.use(cors());

// ✅ Allows Express to parse form data correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Handles URL-encoded data

// ✅ Set up Multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// ✅ Ensure this is after middleware but before routes
app.use("/api/users", require("./api/routes/userRoutes"));
app.use("/api/items", require("./api/routes/itemRoutes"));

// ✅ Export app for Vercel compatibility
module.exports = app;
