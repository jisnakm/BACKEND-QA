const express = require ('express');
const mongoose = require ('mongoose');
const User = require("../model/user.js")

const router = express.Router();

// Register a user
router.post("/", (req, res) => {
  const { email, name, password } = req.body;

  const user = new User({ email, name, password });

  user
    .save()
    .then(() => {
      res.status(201).json({ message: "User registered successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to register user" });
    });
});

module.exports = router;
