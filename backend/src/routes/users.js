const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const ApiResponse = require('../utils/apiResponse');

// Get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(ApiResponse.success(user, 'User profile retrieved successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Update user profile
router.put('/me', protect, async (req, res) => {
  try {
    const { name, email, profile, preferences } = req.body;
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (profile) user.profile = { ...user.profile, ...profile };
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();
    res.json(ApiResponse.success(user, 'Profile updated successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Update user password
router.put('/me/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json(ApiResponse.error('Current password is incorrect'));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json(ApiResponse.success(null, 'Password updated successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

module.exports = router; 