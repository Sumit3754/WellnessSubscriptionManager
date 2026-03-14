const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const { protect, authorize } = require('../middleware/auth');
const ApiResponse = require('../utils/apiResponse');

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true });
    res.json(ApiResponse.success(classes, 'Classes retrieved successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Get single class
router.get('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json(ApiResponse.error('Class not found'));
    }
    res.json(ApiResponse.success(classItem, 'Class retrieved successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Create class (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(ApiResponse.success(newClass, 'Class created successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Update class (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const classItem = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!classItem) {
      return res.status(404).json(ApiResponse.error('Class not found'));
    }
    res.json(ApiResponse.success(classItem, 'Class updated successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

// Delete class (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json(ApiResponse.error('Class not found'));
    }
    await classItem.remove();
    res.json(ApiResponse.success(null, 'Class deleted successfully'));
  } catch (error) {
    res.status(500).json(ApiResponse.error('Server error'));
  }
});

module.exports = router; 