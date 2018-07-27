const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function authenticate(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access Denied. Authentication header needed');
  }
  try {
    const validToken = jwt.decode(token, config.get('jwtPrivateKey'));
    req.user = validToken;
    next();
  } catch (exception) {
    return res.status(401).send('Access Denied. Invalid authentication token');
  }
}
