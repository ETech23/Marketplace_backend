require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./api/routes/userRoutes"));
app.use("/api/items", require("./api/routes/itemRoutes"));

module.exports = app;
