const config = require('config');
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(403).send('Access Denied. Invalid authentication token');
  }
  try {
    const validToken = jwt.decode(token, config.get('jwtPrivateKey'));
    req.user = validToken;
    next();
  } catch (exception) {
    return res.status(403).send('Access Denied. Invalid authentication token');
  }
}

module.exports = authenticate;
