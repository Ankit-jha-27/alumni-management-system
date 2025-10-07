const Alumni = require('../models/Alumni');

// Get all alumni
exports.getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new alumni
exports.addAlumni = async (req, res) => {
  try {
    const newAlumni = new Alumni(req.body);
    await newAlumni.save();
    res.status(201).json(newAlumni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete alumni by ID
exports.deleteAlumni = async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
