let mongoose = require('mongoose');

let bookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'room'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  stopTime: {
    type: Date,
    required: true
  },
  details: {
    type: String,
    required: true,
    lowercase: true
  }
});

module.exports = mongoose.model('booking', bookingSchema);
