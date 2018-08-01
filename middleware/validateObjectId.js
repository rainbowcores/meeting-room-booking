const mongoose = require('mongoose');

module.exports = function validateId(req, res, next) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(500).send('Invalid ID provided');
  }
  next();
}