// models/carpool.model.js
const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true },
  route: {
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
  },
  vehicleType: { type: String, required: true },
  genderPreference: { type: String, enum: ['male', 'female', 'any'], default: 'any' },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  seatsAvailable: { type: Number, required: true },
});

module.exports = mongoose.model('Carpool', carpoolSchema);
