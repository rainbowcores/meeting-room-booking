const mongoose = require('mongoose');
const config = require('config');

module.exports = function (logger) {
  mongoose.connect(config.get('db')) // will change according to environment
    .then(logger.info('connected to MongoDB'))
  let db = mongoose.connection;
  db.on('error', (error) => { throw new Error(error); });
}
