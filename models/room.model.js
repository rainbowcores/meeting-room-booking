let mongoose = require('mongoose');
let schema = mongoose.Schema;
let equipment = require('./equipment.model');

let roomSchema = new schema({
  location: {
    type: String,
    required: false
  },
  capacity: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: "available",
    enum: ['booked', 'available', 'pending']
  },
  name: {
    type: String,
    required: true
  },
  equipment: {
    type: [{ type: schema.Types.ObjectId, ref: 'equipment' }], // defined relationship
    required: false
  }
});

module.exports = mongoose.model('Room', roomSchema);
