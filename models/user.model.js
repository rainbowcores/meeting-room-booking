let mongoose = require('mongoose');
let schema = mongoose.Schema;

let userSchema = new schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const User =  mongoose.model('User', userSchema);
module.exports = User;
