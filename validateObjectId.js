const mongoose = require('mongoose');

function validateId(validateId) {
  return mongoose.Types.ObjectId.isValid(validateId);
}

module.exports = validateId;
