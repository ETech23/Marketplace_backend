const Item = require("../models/Item");

const createItem = async (req, res) => {
  try {
    const { name, price, currency, description, location, category } = req.body;
    if (!name || !price || !description) throw new Error("Missing required fields");

    const images = req.files.map(file => file.path);

    const newItem = await Item.create({ 
      name, price, currency, description, location, category, images, user: req.user.id 
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItems = async (req, res) => {
  const items = await Item.find().populate("user", "name email");
  res.json(items);
};

module.exports = { createItem, getItems };
