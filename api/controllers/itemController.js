const Item = require("../models/Item");

const createItem = async (req, res) => {
    try {
        console.log("DEBUG: Received body:", req.body); // ✅ Ensure fields are received
        console.log("DEBUG: Received files:", req.files); // ✅ Ensure files are received

        // If no files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required." });
        }

        // If any required field is missing
        const { name, price, currency, description, location, category } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Ensure files are an array before mapping
        const images = Array.isArray(req.files) ? req.files.map(file => file.path) : [];

        // Create new item
        const newItem = await Item.create({
            name,
            price,
            currency,
            description,
            location,
            category,
            images,
            user: req.user.id
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error saving item:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const getItems = async (req, res) => { const items = await Item.find().populate("user", "name email"); res.json(items); };

module.exports = { createItem, getItems };
