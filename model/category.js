const mongoose = require("mongoose");

// Create a Category schema and model

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    level: { type: String, enum: ["Begnner", "Intermediate", "Expert"] },
  });
  
  const Category = mongoose.model("Category", categorySchema);

  module.exports = Category;