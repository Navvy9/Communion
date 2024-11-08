// Route to get user details (e.g., routes/auth.js)
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Mongoose model for users
const router = express.Router();

router.get('/user', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    res.json({ username: user.username });
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve user' });
  }
});

module.exports = router;
