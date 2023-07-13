const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");

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
        const cleanedUser = {
          email: user.email,
          name: user.name,
          role: user.role,
          id: user.id,
        }


        let payload = { user: cleanedUser } 
        let token = jwt.sign( payload, 'a25dc5668b9a1b8b6c4729680b64401aef61f27156bfce37676a5df001b6b5b348794a9dbac3329fa914b31574eddfdcf641f9a332e5bf4241e08721fe37834e')
        res.status(201).json({
          status: "success",
          data: {token,
            user: cleanedUser,
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
