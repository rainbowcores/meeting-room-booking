let mongoose = require('mongoose');
let schema = mongoose.Schema;
let room = require('./room.model');
let user = require('./user.model');

let bookingSchema = new schema({
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
