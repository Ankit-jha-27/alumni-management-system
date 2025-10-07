const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    batch: { type: String },
    placement: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);
