let mongoose = require('mongoose');
let schema = mongoose.Schema;

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
    required: true
  },
  name: {
    type: String,
    required: true
  },
  equipment: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model('Room', roomSchema);
