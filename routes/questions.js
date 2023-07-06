const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Create a Question schema and model
const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
  });
  
  const Question = mongoose.model('Question', questionSchema);
  
  
  // Get all questions
  router.get('/', (req, res) => {
    Question.find()
      .then((questions) => {
        res.status(200).json(questions);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to fetch questions' });
      });
  });
  
  // Create a new question
  router.post('/', (req, res) => {
    const { title, content } = req.body;
  
    const question = new Question({ title, content });
  
    question.save()
      .then(() => {
        res.status(201).json({ message: 'Question created successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to create question' });
      });
  });
  
  // Update a question
  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    Question.findByIdAndUpdate(id, { title, content })
      .then(() => {
        res.status(200).json({ message: 'Question updated successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update question' });
      });
  });
  
  // Delete a question
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Question.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ message: 'Question deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete question' });
      });
  });

  module.exports = router;