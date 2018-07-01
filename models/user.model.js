let mongoose = require('mongoose');
let schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // for hashing passwords
const SALT_WORK_FACTOR = 10;

let userSchema = new schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
    required: true,
    enum: ['admin', 'staff']
  }
});

userSchema.pre('save', function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// password matcher function for login
UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
