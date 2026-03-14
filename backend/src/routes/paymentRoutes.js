const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Create a new order
router.post('/create-order', protect, PaymentController.createOrder);

// Verify payment
router.post('/verify-payment', protect, PaymentController.verifyPayment);

// Get payment details
router.get('/payment/:paymentId', protect, PaymentController.getPaymentDetails);

module.exports = router; 