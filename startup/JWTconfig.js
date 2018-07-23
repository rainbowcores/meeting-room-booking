const config = require('config');

module.exports = function () {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('Cannot start application without ENV VAR MBR_JWTPrivateKey')
  }
}
