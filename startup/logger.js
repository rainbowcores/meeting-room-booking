const { createLogger, transports, format } = require('winston');
const { combine, timestamp, colorize } = format;
const path = require('path');

module.exports = function () {
  // we will use winston to log errors to other log files
  return createLogger({
    format: combine(
      timestamp(),
      colorize(),
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: path.join(__dirname, '/logs', 'errors.log')
      })
    ],
    exceptionHandlers: [
      new transports.File({ filename: path.join(__dirname, '../logs/', 'unhandledExceptions.log') })
    ],
    exitOnError: true // terminate process on error
  });
}
