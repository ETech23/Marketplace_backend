const express = require("express");
const { createItem, getItems } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../../config/cloudinary");

// Debug Multer Storage
console.log("USING MULTER STORAGE:", storage);

const upload = multer({ storage }); // ✅ Ensure only Cloudinary storage is used

const router = express.Router();

// Debugging route
router.post("/debug", protect, upload.array("media", 3), (req, res) => {
  console.log("Received body:", req.body);
  console.log("Received files:", req.files);
  res.json({ message: "Debugging request received", files: req.files });
});

router.post("/", protect, upload.array("media", 3), createItem);
router.get("/", getItems);

module.exports = router;
