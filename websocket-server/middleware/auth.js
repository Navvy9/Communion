const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Mongoose model for users
const HelpAlert = require('../models/HelpAlert'); // Mongoose model for help alerts
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is properly set in your environment variables

// Route to get user details
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

// Route to create a Help Alert
router.post('/helpalerts', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { name, helpNeeded, email, phoneNumber } = req.body;

    const newHelpAlert = new HelpAlert({
      name,
      helpNeeded,
      email,
      phoneNumber,
      userId: decoded.userId,
    });

    await newHelpAlert.save();
    res.status(201).json(newHelpAlert);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create help alert' });
  }
});

// Route to fetch all Help Alerts
router.get('/helpalerts', async (req, res) => {
  try {
    const helpAlerts = await HelpAlert.find().sort({ createdAt: -1 });
    res.json(helpAlerts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch help alerts' });
  }
});

// Route to delete a Help Alert
router.delete('/helpalerts/:id', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const helpAlert = await HelpAlert.findById(req.params.id);

    if (!helpAlert) {
      return res.status(404).json({ message: 'Help Alert not found' });
    }

    // Ensure the logged-in user is the owner
    if (helpAlert.userId.toString() !== decoded.userId) {
      return res.status(403).json({ message: 'You can only delete your own Help Alerts' });
    }

    await helpAlert.remove();
    res.status(200).json({ message: 'Help Alert deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Help Alert' });
  }
});

module.exports = router;
