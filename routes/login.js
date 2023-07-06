const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user")

const router = express.Router();


// User login
router.post("/", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Login failed" });
    });
});

module.exports = router;
