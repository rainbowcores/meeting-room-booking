const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'HTTP.log'), { flags: 'a' }); // log requests to this file
const config = require('config');

const app = express();
app.use(express.json()); // only parse requests wih content-type json headers, sets results in req.body
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const logger = require('./startup/logger')();
require('./routes/routerConfig')(app, logger); // set up routing
require('./startup/database')(logger); // set up db configuration
require('./startup/JWTconfig')(); // check JWT private key has been set

// log with standard Apache type to a file access.log
app.use(morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  { stream: accessLogStream }
));
logger.info('Morgan started, Logging response outputs to access.log');

const server = app.listen(process.env.PORT || config.get('port') || 3000, function () {
  logger.info('node process started');
});

module.exports = server;
