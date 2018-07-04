let mongoose = require('mongoose');

let bookingSchema = new mongoose.Schema({
  room_id: {
    type: schema.Types.ObjectId,
    required: true,
    ref: 'room'
  },
  userId: {
    type: schema.Types.ObjectId,
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

module.exports = mongoose.model('Booking', bookingSchema);
