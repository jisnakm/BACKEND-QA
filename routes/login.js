const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");

const router = express.Router();

// User login
router.post("/", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.status(200).json({
          status: "success",
          data: {
            user: {
              email: user.email,
              name: user.name,
              role: user.role,
              id: user.id,
            },
          },
        });
      } else {
        res.status(401).json({
          status: "failed",
          data: { error: "Invalid credentials" },
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
        data: { error: "login failed" },
      });
    });
});

module.exports = router;
