const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({

  busName: {
    type: String,
    required: true
  },

  source: {
    type: String,
    required: true
  },

  destination: {
    type: String,
    required: true
  },

  departureTime: {
    type: String,
    required: true
  },

  arrivalTime: {
    type: String,
    required: true
  },

  fare: {
    type: Number,
    required: true
  },

  totalSeats: {
    type: Number,
    default: 40
  },

  availableSeats: {
    type: Number,
    default: 40
  },
  bookedSeats: [
  {
    type: String
  }
]

}, {
  timestamps: true
});

module.exports = mongoose.model('Bus', busSchema);