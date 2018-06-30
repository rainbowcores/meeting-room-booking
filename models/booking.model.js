let mongoose = require('mongoose');
let schema = mongoose.Schema;

let bookingSchema = new schema({
  room_id: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date,
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
