let mongoose = require('mongoose');
let schema = mongoose.Schema;

let equipmentSchema = new schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Equipment', equipmentSchema);
