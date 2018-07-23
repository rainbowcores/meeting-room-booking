const express = require('express');
const chalk = require('chalk'); // lib for colors and interesting stuff
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'HTTP.log'), { flags: 'a' }); // log requests to this file

var app = express();
const logger = require('./startup/logger')();
require('./routes/routerConfig')(app, logger); // set up routing
require('./startup/database')(); // set up db configuration
require('./startup/JWTconfig')(); // check JWT private key has been set

app.use(express.json()); // only parse requests wih content-type json headers, sets results in req.body
app.use(express.urlencoded({ extended: false }));
app.use(cors());

process.on('unhandledRejection', (exception) => {
  throw exception; // throw this so it can be caught by winston as an exception
});

// log with standard Apache type to a file access.log
app.use(morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  { stream: accessLogStream }
));
console.log(chalk.blue('Morgan started, Logging response outputs to access.log'));

app.listen(process.env.PORT || 3000, function () {
  console.log(chalk.blue('Initializing project ....'));
  console.log(chalk.green('rainbowcores loading awesomeness ...'));
  console.log(chalk.yellow('Express project started :)'));
  console.log(chalk.white('listening on port 3000'));
});
