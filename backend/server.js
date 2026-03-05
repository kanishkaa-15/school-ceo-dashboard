const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/staff', require('./routes/staff'));
app.use('/api/admissions', require('./routes/admissions'));
app.use('/api/queries', require('./routes/queries'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/achievements', require('./routes/achievements'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'School CEO Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});