const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Class = require('../models/Class');
const Booking = require('../models/Booking');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

// Admin dashboard
exports.getDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const subscriptionCount = await Subscription.countDocuments();
    const classCount = await Class.countDocuments();
    const bookingCount = await Booking.countDocuments();
    
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentSubscriptions = await Subscription.find().sort({ createdAt: -1 }).limit(5);
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    
    const dashboardData = {
      stats: {
        userCount,
        subscriptionCount,
        classCount,
        bookingCount
      },
      recentUsers,
      recentSubscriptions,
      recentBookings
    };
    
    return res.status(200).json(ApiResponse.success(dashboardData, 'Dashboard data retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

// User management
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(ApiResponse.success(users, 'Users retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json(ApiResponse.error('User not found', 404));
    }
    return res.status(200).json(ApiResponse.success(user, 'User retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json(ApiResponse.error('User not found', 404));
    }
    
    // Update user fields
    const { name, email, role, subscription } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (subscription) user.subscription = subscription;
    
    await user.save();
    return res.status(200).json(ApiResponse.success(user, 'User updated successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json(ApiResponse.error('User not found', 404));
    }
    
    await user.remove();
    return res.status(200).json(ApiResponse.success(null, 'User deleted successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

// Subscription management
exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('user', 'name email');
    return res.status(200).json(ApiResponse.success(subscriptions, 'Subscriptions retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user', 'name email');
    if (!subscription) {
      return res.status(404).json(ApiResponse.error('Subscription not found', 404));
    }
    return res.status(200).json(ApiResponse.success(subscription, 'Subscription retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json(ApiResponse.error('Subscription not found', 404));
    }
    
    // Update subscription fields
    const { plan, status, startDate, endDate } = req.body;
    if (plan) subscription.plan = plan;
    if (status) subscription.status = status;
    if (startDate) subscription.startDate = startDate;
    if (endDate) subscription.endDate = endDate;
    
    await subscription.save();
    return res.status(200).json(ApiResponse.success(subscription, 'Subscription updated successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json(ApiResponse.error('Subscription not found', 404));
    }
    
    await subscription.remove();
    return res.status(200).json(ApiResponse.success(null, 'Subscription deleted successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

// Class management
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    return res.status(200).json(ApiResponse.success(classes, 'Classes retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.getClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json(ApiResponse.error('Class not found', 404));
    }
    return res.status(200).json(ApiResponse.success(classItem, 'Class retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    return res.status(201).json(ApiResponse.success(newClass, 'Class created successfully', 201));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json(ApiResponse.error('Class not found', 404));
    }
    
    // Update class fields
    const { name, description, instructor, category, difficulty, duration, capacity, schedule, price, image, isActive } = req.body;
    if (name) classItem.name = name;
    if (description) classItem.description = description;
    if (instructor) classItem.instructor = instructor;
    if (category) classItem.category = category;
    if (difficulty) classItem.difficulty = difficulty;
    if (duration) classItem.duration = duration;
    if (capacity) classItem.capacity = capacity;
    if (schedule) classItem.schedule = schedule;
    if (price) classItem.price = price;
    if (image) classItem.image = image;
    if (isActive !== undefined) classItem.isActive = isActive;
    
    await classItem.save();
    return res.status(200).json(ApiResponse.success(classItem, 'Class updated successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json(ApiResponse.error('Class not found', 404));
    }
    
    await classItem.remove();
    return res.status(200).json(ApiResponse.success(null, 'Class deleted successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

// Booking management
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('class', 'name instructor');
    return res.status(200).json(ApiResponse.success(bookings, 'Bookings retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('class', 'name instructor');
    if (!booking) {
      return res.status(404).json(ApiResponse.error('Booking not found', 404));
    }
    return res.status(200).json(ApiResponse.success(booking, 'Booking retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json(ApiResponse.error('Booking not found', 404));
    }
    
    // Update booking fields
    const { status, paymentStatus, checkInTime, notes } = req.body;
    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    if (checkInTime) booking.checkInTime = checkInTime;
    if (notes) booking.notes = notes;
    
    await booking.save();
    return res.status(200).json(ApiResponse.success(booking, 'Booking updated successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json(ApiResponse.error('Booking not found', 404));
    }
    
    await booking.remove();
    return res.status(200).json(ApiResponse.success(null, 'Booking deleted successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

// Payment management
exports.getPayments = async (req, res) => {
  try {
    // This would typically involve querying a Payment model
    // For now, we'll return a placeholder response
    return res.status(200).json(ApiResponse.success([], 'Payments retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
};

exports.getPayment = async (req, res) => {
  try {
    // This would typically involve querying a Payment model
    // For now, we'll return a placeholder response
    return res.status(200).json(ApiResponse.success({}, 'Payment retrieved successfully'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error(error.message));
  }
}; 