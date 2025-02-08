const express = require("express");
const { createItem, getItems } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../../config/cloudinary"); // ✅ Correct import for Cloudinary storage

const upload = multer({ storage }); // ✅ Multer storage using Cloudinary
const router = express.Router();

// ✅ Debugging route (remove after testing)
router.post("/debug", protect, upload.array("media", 3), (req, res) => {
    console.log("Received body:", req.body);  // Check if name, price, description exist
    console.log("Received files:", req.files);  // Check if files are received
    res.json({ message: "Debugging request received" });
});

// ✅ Actual item creation route
router.post("/", protect, upload.array("media", 3), createItem);
router.get("/", getItems);

module.exports = router;
