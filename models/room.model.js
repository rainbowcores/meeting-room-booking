let mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
  location: {
    type: String,
    required: false,
    lowercase: true
  },
  capacity: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: "available",
    enum: ['booked', 'available', 'pending'],
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
    lowercase: true
  },
  equipment: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'equipment' }], // defined relationship
    required: false
  }
});

module.exports = mongoose.model('Room', roomSchema);
