const express = require("express");
const mongoose = require("mongoose");
const Category = require("./category");
const User = require("../model/user");
const Question = require("../model/question");
const authenticateToken = require("../util");

const router = express.Router();

// Get all questions
router.get("/", authenticateToken,(req, res) => {

  Question.find().populate('category')
    .then((questions) => {
      allquestions = questions.map(
        ({ id, category, title, answerType, answer }) => ({
          id,
          category,
          title,
          answerType,
          answer,
        })
      );
      res.status(200).json({
        status: "success",
        data: {
          allquestions,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
        data: { error: "Failed to fetch questions" },
      });
    });
});

// Create a new question
router.post("/", authenticateToken,(req, res) => {

  const { category, title, answerType, answer } = req.body;

  const question = new Question({ category, title, answerType, answer });

  question
    .save()
    .then(() => {
      res.status(201).json({
        status: "success",
        data: {
          question: {
            category: question.category,
            title: question.title,
            answerType: question.answerType,
            answer: question.answer,
            id: question.id,
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

// Update a question
router.patch("/:id", authenticateToken, async(req, res) => {
  const { id } = req.params;
  const { category, title, answerType, answer } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(
    id,
    { category, title, answerType, answer },
    { new: true }
  );
  if (question !== null) {
    res.status(200).json({
      status: "success",
      data: {
        question: {
          category: question.category,
          title: question.title,
          answerType: question.answerType,
          answer: question.answer,
          id: question.id,
        },
      },
    });
  } else {
    res.status(500).json({
      status: "failed",
      data: { error: "Failed to update question" },
    });
  }
}
catch(error){
  res.status(500).json({
    status: "failed",
    data: { error: "internal server error" },
  });
}
});

// Delete a question
router.delete("/:id", authenticateToken,(req, res) => {
  const { id } = req.params;

  Question.findByIdAndDelete(id)
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
