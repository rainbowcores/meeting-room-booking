let mongoose = require('mongoose');
let schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // for hashing passwords
const SALT_WORK_FACTOR = 10;

let userSchema = new schema({
  password: {
    type: String,
    required: { true: 'You need to provide a password' }
  },
  email: {
    type: String,
    required: { true: 'Email is required'},
    unique: true,
    validate: {
      validator: function (email) {
        // validator source: Chromium
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
      },
      message: '{VALUE} is not a email!'
    },
  },
  firstname: {
    type: String,
    required: { true: 'You need to provide a value for the field firstname' }
  },
  lastname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: { true: 'You need to provide a value for the field lastname' },
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
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
