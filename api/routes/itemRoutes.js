const express = require("express");
const { createItem, getItems } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const cloudinaryStorage = require("../../config/cloudinary");

const upload = multer({ storage: cloudinaryStorage });

const router = express.Router();

router.post("/", protect, upload.array("media", 3), createItem);
router.get("/", getItems);

module.exports = router;
