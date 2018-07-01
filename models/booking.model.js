let mongoose = require('mongoose');
let schema = mongoose.Schema;

let bookingSchema = new schema({
  room_id: {
    type: schema.Types.ObjectId,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
  },
  stopTime: {
    type: Date,
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
