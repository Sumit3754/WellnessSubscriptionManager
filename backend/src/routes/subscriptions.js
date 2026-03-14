const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const ApiResponse = require('../utils/apiResponse');

// Get user's subscription
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('subscription');
    res.json(ApiResponse.success(user.subscription, 'Subscription retrieved successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Update subscription
router.put('/me', protect, async (req, res) => {
  try {
    const { plan, status, startDate, endDate } = req.body;
    const user = await User.findById(req.user.id);

    user.subscription = {
      ...user.subscription,
      plan: plan || user.subscription.plan,
      status: status || user.subscription.status,
      startDate: startDate || user.subscription.startDate,
      endDate: endDate || user.subscription.endDate
    };

    await user.save();
    res.json(ApiResponse.success(user.subscription, 'Subscription updated successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Cancel subscription
router.post('/cancel', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.subscription.status = 'cancelled';
    await user.save();
    
    res.json(ApiResponse.success(user.subscription, 'Subscription cancelled successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

module.exports = router; 