import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";

const app =express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Create a User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Create a Question schema and model
const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);

// Register a user
app.post('/register', (req, res) => {
  const {email, username, password } = req.body;

  const user = new User({email, username, password });

  user.save()
    .then(() => {
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to register user' });
    });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Login failed' });
    });
});

// Get all questions
app.get('/questions', (req, res) => {
  Question.find()
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch questions' });
    });
});

// Create a new question
app.post('/questions', (req, res) => {
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
app.patch('/questions/:id', (req, res) => {
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
app.delete('/questions/:id', (req, res) => {
  const { id } = req.params;

  Question.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Question deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete question' });
    });
});

  // Start the server

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});