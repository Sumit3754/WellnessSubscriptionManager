const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Admin dashboard
router.get('/', protect, authorize('admin'), adminController.getDashboard);

// User management
router.get('/users', protect, authorize('admin'), adminController.getUsers);
router.get('/users/:id', protect, authorize('admin'), adminController.getUser);
router.put('/users/:id', protect, authorize('admin'), adminController.updateUser);
router.delete('/users/:id', protect, authorize('admin'), adminController.deleteUser);

// Subscription management
router.get('/subscriptions', protect, authorize('admin'), adminController.getSubscriptions);
router.get('/subscriptions/:id', protect, authorize('admin'), adminController.getSubscription);
router.put('/subscriptions/:id', protect, authorize('admin'), adminController.updateSubscription);
router.delete('/subscriptions/:id', protect, authorize('admin'), adminController.deleteSubscription);

// Class management
router.get('/classes', protect, authorize('admin'), adminController.getClasses);
router.get('/classes/:id', protect, authorize('admin'), adminController.getClass);
router.post('/classes', protect, authorize('admin'), adminController.createClass);
router.put('/classes/:id', protect, authorize('admin'), adminController.updateClass);
router.delete('/classes/:id', protect, authorize('admin'), adminController.deleteClass);

// Booking management
router.get('/bookings', protect, authorize('admin'), adminController.getBookings);
router.get('/bookings/:id', protect, authorize('admin'), adminController.getBooking);
router.put('/bookings/:id', protect, authorize('admin'), adminController.updateBooking);
router.delete('/bookings/:id', protect, authorize('admin'), adminController.deleteBooking);

// Payment management
router.get('/payments', protect, authorize('admin'), adminController.getPayments);
router.get('/payments/:id', protect, authorize('admin'), adminController.getPayment);

module.exports = router; 