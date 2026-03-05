const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  grade: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  applicationDate: { type: Date, default: Date.now },
  documents: [{ type: String }],
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);