const bcrypt = require('bcryptjs');
const Alumni = require('../models/Alumni');
const Project = require('../models/Project');
const Event = require('../models/Event');
const Notification = require('../models/Notification');
const User = require('../models/User'); // If you have a generic User model

// Register user (faculty, student, alumni)
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    return res.status(201).json({ message: 'Registration successful.' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
};
