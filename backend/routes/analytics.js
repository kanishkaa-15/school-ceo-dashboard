const express = require('express');
const Staff = require('../models/Staff');
const Admission = require('../models/Admission');
const Query = require('../models/Query');
const router = express.Router();

// GET student performance data
router.get('/student-performance', async (req, res) => {
  try {
    const totalAdmissions = await Admission.countDocuments();
    const approvedStudents = await Admission.countDocuments({ status: 'Approved' });
    const passPercentage = totalAdmissions > 0 ? ((approvedStudents / totalAdmissions) * 100).toFixed(1) : 0;
    
    res.json({
      gradeDistribution: [],
      totalStudents: approvedStudents,
      passPercentage,
      averageMarks: 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET admissions analytics
router.get('/admissions', async (req, res) => {
  try {
    const totalAdmissions = await Admission.countDocuments();
    const pendingAdmissions = await Admission.countDocuments({ status: 'Pending' });
    const approvedAdmissions = await Admission.countDocuments({ status: 'Approved' });
    const rejectedAdmissions = await Admission.countDocuments({ status: 'Rejected' });

    res.json({
      admissionData: [],
      totalAdmissions,
      pendingAdmissions,
      approvedAdmissions,
      rejectedAdmissions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET retention analytics
router.get('/retention', async (req, res) => {
  try {
    const totalStaff = await Staff.countDocuments();
    const activeStaff = await Staff.countDocuments({ status: 'Active' });
    const retentionRate = totalStaff > 0 ? ((activeStaff / totalStaff) * 100).toFixed(1) : 0;

    res.json({ 
      retentionData: [],
      retentionRate,
      totalStaff,
      activeStaff
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET institutional health index
router.get('/health-index', async (req, res) => {
  try {
    const totalStaff = await Staff.countDocuments();
    const activeStaff = await Staff.countDocuments({ status: 'Active' });
    const totalQueries = await Query.countDocuments();
    const resolvedQueries = await Query.countDocuments({ status: 'Resolved' });
    const totalAdmissions = await Admission.countDocuments();
    const approvedAdmissions = await Admission.countDocuments({ status: 'Approved' });

    const staffRetention = totalStaff > 0 ? (activeStaff / totalStaff * 10) : 5;
    const queryResolution = totalQueries > 0 ? (resolvedQueries / totalQueries * 10) : 5;
    const admissionSuccess = totalAdmissions > 0 ? (approvedAdmissions / totalAdmissions * 10) : 5;

    const healthMetrics = {
      overallScore: ((staffRetention + queryResolution + admissionSuccess) / 3).toFixed(1),
      staffRetention: staffRetention.toFixed(1),
      queryResolutionRate: queryResolution.toFixed(1),
      admissionSuccessRate: admissionSuccess.toFixed(1)
    };

    res.json(healthMetrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET parent trust index
router.get('/parent-trust', async (req, res) => {
  try {
    const totalQueries = await Query.countDocuments();
    const resolvedQueries = await Query.countDocuments({ status: 'Resolved' });
    const trustScore = totalQueries > 0 ? (resolvedQueries / totalQueries * 10) : 5;

    res.json({
      trustData: [],
      overallTrust: trustScore.toFixed(1),
      totalQueries,
      resolvedQueries
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;