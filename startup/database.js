const mongoose = require('mongoose');
const chalk = require('chalk'); // lib for colors and interesting stuff
const config = require('config');

module.exports = function () {
  mongoose.connect(config.get('db'))
    .then(console.log(chalk.gray('connected to MongoDB')))
  let db = mongoose.connection;
  db.on('error', (error) => { throw new Error(error); });
}
