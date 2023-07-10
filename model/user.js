const mongoose = require("mongoose");

// Create a User schema and model
const userSchema = new mongoose.Schema({
  email: { type: "string", required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum:["user","admin"]}
});

const User = mongoose.model("User", userSchema);

module.exports = User;