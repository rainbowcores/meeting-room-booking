const mongoose = require('mongoose');
const chalk = require('chalk'); // lib for colors and interesting stuff

module.exports = function () {
  mongoose.connect('mongodb://localhost/meetingroombooking')
    .then(console.log(chalk.gray('connected to MongoDB')))
  let db = mongoose.connection;
  db.on('error', (error) => { throw new Error(error); });
}
