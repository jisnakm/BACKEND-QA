const express = require("express");
const mongoose = require("mongoose");
const Category = require("../model/category");
const authenticateToken = require("../util");

const router = express.Router();

// Get all category
router.get("/", authenticateToken,(req, res) => {
  Category.find()
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch category" });
    });
});

// Create a new category
router.post("/", authenticateToken,(req, res) => {
  const { title, level } = req.body;

  const category = new Category({ title, level });

  category
    .save()
    .then(() => {
      res.status(201).json({
        status: "success",
        data: {
          category: {
            title: category.title,
            level: category.level,
            id: category.id,
          },
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
        data: { error: "Failed to create question" },
      });
    });
});

//update a category
router.patch("/:id", authenticateToken,async(req, res) => {
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
router.delete("/:id", authenticateToken,(req, res) => {
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
