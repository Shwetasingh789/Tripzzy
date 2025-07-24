// controllers/carpool.controller.js
const carpoolService = require('../services/carpool.service');
const { validationResult } = require('express-validator');

exports.getCarpoolMatches = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { pickup, destination, genderPreference } = req.query;

  try {
    const matches = await carpoolService.findMatchingCarpools({
      pickup,
      destination,
      genderPreference,
    });

    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCarpool = async (req, res) => {
  const { captainId, route, seatsAvailable, genderPreference, vehicleType } = req.body;

  try {
    const newCarpool = await carpoolService.createCarpool({
      captainId,
      route,
      seatsAvailable,
      genderPreference,
      vehicleType,
    });

    res.status(201).json(newCarpool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.joinCarpool = async (req, res) => {
  const { carpoolId } = req.body;
  const userId = req.user._id;

  try {
    const carpool = await carpoolService.joinCarpool(carpoolId, userId);
    res.status(200).json(carpool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
