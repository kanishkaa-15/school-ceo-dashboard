const express = require('express');
const Staff = require('../models/Staff');
const router = express.Router();

// GET all staff
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET staff by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Staff.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Staff member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST new staff member
router.post('/', async (req, res) => {
  try {
    const member = new Staff(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update staff member
router.put('/:id', async (req, res) => {
  try {
    const member = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Staff member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE staff member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Staff.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Staff member not found' });
    res.json({ message: 'Staff member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;