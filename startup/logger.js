const { createLogger, transports, format } = require('winston');
const path = require('path');

module.exports = function () {

  process.on('unhandledRejection', (exception) => {
    throw exception; // throw this so it can be caught by winston as an exception
  });
  // we will use winston to log errors to other log files
  return createLogger({
    transports: [
      new transports.Console(),
      new transports.File({
        level: 'error',
        filename: path.join(__dirname, '../logs/', 'errors.log')
      }),
      new transports.File({
        level: 'info',
        filename: path.join(__dirname, '../logs/', 'info.log')
      }),
      new transports.File({
        level: 'warn',
        filename: path.join(__dirname, '../logs/', 'warnings.log')
      })
    ],
    exceptionHandlers: [
      new transports.File({ filename: path.join(__dirname, '../logs/', 'unhandledExceptions.log') })
    ],
    exitOnError: true // terminate process on error
  });
}
