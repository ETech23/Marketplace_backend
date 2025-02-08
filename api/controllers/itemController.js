const Item = require("../models/Item");

const createItem = async (req, res) => {
    try {
        console.log("DEBUG: Received body:", req.body);
        console.log("DEBUG: Received files:", req.files);

        // Ensure files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required." });
        }

        // Ensure required fields are present
        const { name, price, currency, description, location, category } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Ensure files are an array
        const images = req.files.map(file => file.path);

        // Create item
        const newItem = await Item.create({
            name,
            price,
            currency,
            description,
            location,
            category,
            images,
            user: req.user ? req.user.id : null, // ✅ Prevents crash if `req.user` is missing
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error("❌ ERROR: Internal Server Error", error); // ✅ Detailed error log
        res.status(500).json({ error: error.message || "Server error" });
    }
};

const getItems = async (req, res) => {
    const items = await Item.find().populate("user", "name email");
    res.json(items);
};

module.exports = { createItem, getItems };
