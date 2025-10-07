const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    teamMembers: [{ type: String }],
    mentor: { type: String },
    category: { type: String },
    link: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema, 'Projects');
