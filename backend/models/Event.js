const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    category: { type: String },
    speakers: [{ type: String }],
    venue: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema, 'Events');
