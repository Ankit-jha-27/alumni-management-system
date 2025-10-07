const express = require('express');
const router = express.Router();
const { getEvents, addEvent, deleteEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', addEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
