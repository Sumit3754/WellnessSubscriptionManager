const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json(ApiResponse.error('User already exists'));
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json(ApiResponse.success({ token }, 'User registered successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(ApiResponse.error('Invalid credentials'));
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json(ApiResponse.error('Invalid credentials'));
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json(ApiResponse.success({ token }, 'Login successful'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

module.exports = router; 