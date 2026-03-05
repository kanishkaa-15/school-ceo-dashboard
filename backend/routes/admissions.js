const express = require('express');
const Admission = require('../models/Admission');
const router = express.Router();

// GET all admissions
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET admission by ID
router.get('/:id', async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Admission not found' });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST new admission
router.post('/', async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update admission
router.put('/:id', async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admission) return res.status(404).json({ message: 'Admission not found' });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE admission
router.delete('/:id', async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Admission not found' });
    res.json({ message: 'Admission deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;