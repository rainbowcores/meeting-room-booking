const config = require('config');
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(403).send('Authentication token nor provided');
  }
  try {
    const validToken = jwt.decode(header, config.get('jwtPrivateKey'));
    req.user = validToken;
    next();
  } catch (exception) {
    return res.status(403).send('Authentication token is invalid');
  }
}

module.exports = authenticate;
