const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    fileName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
