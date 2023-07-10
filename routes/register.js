const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user.js");

const router = express.Router();

// Register a user
router.post("/", async (req, res) => {
  const { email, name, password, role } = req.body;
  const docs = await User.findOne({ email: email });

  if (docs == null) {
    const user = new User({ email, name, password, role });

    user
      .save()
      .then(() => {
        res.status(201).json({
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
      })
      .catch((error) => {
        res.status(500).json({
          status: "failed",
          data: { error: "Failed to register user" },
        });
      });
  } else {
    res.status(500).json({
      status: "failed",
      data: { error: "this email alredy exists" },
    });
  }
});

module.exports = router;
