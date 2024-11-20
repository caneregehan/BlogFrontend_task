const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

module.exports = app;
