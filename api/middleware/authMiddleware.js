const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    token = token.split(" ")[1]; // Remove "Bearer " from token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) throw new Error("User not found");

    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, invalid token" });
  }
};

module.exports = { protect };
