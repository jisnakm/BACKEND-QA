const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Create a Question schema and model
const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  answerType: { type: String, required: true },
  answer: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);

// Get all questions
router.get("/", (req, res) => {
  Question.find()
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
router.post("/", (req, res) => {
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
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", (req, res) => {
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
