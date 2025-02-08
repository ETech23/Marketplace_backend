require("dotenv").config(); // ✅ Load .env first

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Debugging log
console.log("CLOUDINARY CONFIG:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("❌ Cloudinary environment variables are missing!");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // ✅ Use correct variable name
  api_key: process.env.CLOUDINARY_API_KEY,  // ✅ Use correct variable name
  api_secret: process.env.CLOUDINARY_API_SECRET,  // ✅ Use correct variable name
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpeg", "png", "jpg", "gif"],
  },
});

module.exports = { cloudinary, storage };
