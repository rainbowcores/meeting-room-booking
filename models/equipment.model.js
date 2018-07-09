let mongoose = require('mongoose');

let equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
    lowercase: true
  },
  details: {
    type: String,
    required: false,
    lowercase: true,
    maxlnegth: 100 // length contraint
  }
});

module.exports = mongoose.model('equipment', equipmentSchema);
