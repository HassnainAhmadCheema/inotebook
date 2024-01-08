const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');



router.post("/createuser", [
  body("name", "Enter a valid name").isLength({ min: 5 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a valid password").isLength({ min: 5 })
], async (req, res) => {
  const topsecret = "hassnainisagoodboy";

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists. Please use a different email." });
    }
  
    // Hashing the password
    const salt = await bcrypt.genSaltSync(10);
    const secpassword = await bcrypt.hash(req.body.password, salt);
  
    // Create the user if the email is unique
    const newUser = await User.create({
      name: req.body.name,
      password: secpassword,
      email: req.body.email
    });
  
    // Now, you can use newUser.id
    const data = {
      user: {
        id: newUser.id
      }
    };
  
    var authtoken = jwt.sign(data, topsecret);
    console.log({ authtoken });
  
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post("/login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a valid password").exists()
], async (req, res) => {
  const topsecret = "hassnainisagoodboy";

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    var authtoken = jwt.sign(data, topsecret);
    res.json({ authtoken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get User Route
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const userdata = await User.findById(userID).select("-password");

    res.status(200).json(userdata);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;