const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true, enum: ["NGN", "USD", "GBP"] },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
