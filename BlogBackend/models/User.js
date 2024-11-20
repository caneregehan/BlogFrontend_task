const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    lastname: String,
    username: String,
    mail: String,
    password: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema, "user");
