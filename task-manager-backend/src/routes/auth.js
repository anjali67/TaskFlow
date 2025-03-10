const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const {name, email, password } = req.body;
  console.log("Register DATA IS",req.body)
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
     
    user = new User({name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).send('Server error');
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", { email, password }); 
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("JWT Error:", err);
        return res.status(500).json({ msg: "Server error" });
      }
      console.log("Token generated:", token); // Debugging
      res.json({ token }); // Ensure the response contains the token
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;