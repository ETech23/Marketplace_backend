const Item = require("../models/Item");

const createItem = async (req, res) => {
    try {
        console.log("Received body:", req.body);  // ✅ Debugging received data
        console.log("Received files:", req.files); // ✅ Debugging uploaded files

        const { name, price, currency, description, location, category } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const images = req.files.map(file => file.path); // ✅ Extract file paths

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

const getItems = async (req, res) => {
    const items = await Item.find().populate("user", "name email");
    res.json(items);
};

module.exports = { createItem, getItems };
