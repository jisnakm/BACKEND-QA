const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

// User login
router.post("/", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then((user) => {
      const  cleanedUser = {
        email: user.email,
        name: user.name,
        role: user.role,
        id: user.id,
      }
      let payload = { user: cleanedUser } 
      let token = jwt.sign( payload, 'a25dc5668b9a1b8b6c4729680b64401aef61f27156bfce37676a5df001b6b5b348794a9dbac3329fa914b31574eddfdcf641f9a332e5bf4241e08721fe37834e')
      if (user) {
        res.status(200).json({
          status: "success",
          data: {token,
           user: cleanedUser,
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
