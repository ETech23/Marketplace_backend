const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new Error("All fields required");

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const user = await User.create({ name, email, password });

    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
