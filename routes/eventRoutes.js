// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/events', eventController.recordEvent);
router.get('/metrics', eventController.getMetrics);

module.exports = router;
