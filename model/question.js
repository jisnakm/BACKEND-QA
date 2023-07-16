const mongoose = require("mongoose");

// Create a Question schema and model
const questionSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    title: { type: String, required: true },
    answerType: { type: String, required: true },
    answer: { type: String, required: true },
  });
  
  const Question = mongoose.model("Question", questionSchema);

  module.exports = Question;