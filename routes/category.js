const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Create a Category schema and model

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ["Begnner", "Intermediate", "Expert"] },
});

const Category = mongoose.model("Category", categorySchema);

// Get all questions
router.get("/", (req, res) => {
  Category.find()
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch category" });
    });
});

// Create a new category
router.patch("/:id", async(req, res) => {
  const { id } = req.params;
  const { title, level } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { title, level },
    { new: true }
  );
  category
  if (category !== null) {
      res.status(200).json({
        status: "success",
        data: {
          category: {
            title: category.title,
            level: category.level,
            id: category.id,
        },
      }
    });
}else {
      res.status(500).json({
        status: "failed",
        data: { error: "Failed to update category" },
      });
    }
});

// Delete a category
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Category.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        status: "success",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
        data: { error: "Failed to delete question" },
      });
    });
});

module.exports = router;
