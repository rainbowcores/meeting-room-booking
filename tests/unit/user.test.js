const user = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
  it('should return valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      email: 'q@q.com',
      firstname: 'drew',
      lastname: 'khal',
      role: 'admin'
    }
    const User = new user(payload);
    const token = User.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});
