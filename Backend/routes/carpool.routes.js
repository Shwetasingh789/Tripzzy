// routes/carpool.routes.js
const express = require('express');
const router = express.Router();
const carpoolController = require('../controllers/carpool.controller');
const { validateCarpoolMatchInput } = require('../validators/carpool.validator');
const { verifyUser } = require('../middlewares/auth.middleware');

// Get matches
router.get('/matches', validateCarpoolMatchInput, carpoolController.getCarpoolMatches);

// Create carpool (captain)
router.post('/create', carpoolController.createCarpool);

// Join carpool (user)
router.post('/join', verifyUser, carpoolController.joinCarpool);

module.exports = router;
