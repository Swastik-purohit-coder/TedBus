const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },

  passengerName: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  seats: [{
    type: String
  }],

  amount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    default: 'SUCCESS'
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);