const request = require('supertest');
const User = require('../../../models/user.model');
const chalk = require('chalk');
const payload = { firstname: 'aaaaa', lastname: 'xxxxx', email: 'a@a.com', password: 'xxxxxxxxx', role: 'admin' };
const jwtToken = new User({ role: 'admin' }).generateAuthToken(); // create JWT token, we only need role
let server;

describe('/api/users', () => {
  beforeEach(async () => {
    server = require('../../../index'); //require and run server
    await User.remove({}); // empty user table in test db
  });

  afterEach(async () => {
    server.close();
  });

  describe('GET', () => {
    it('should return all users', async () => {
      await User.collection.insertMany([payload, {
        firstname: 'bbbbb', lastname: 'xbbbb', email: 'rand@x.com', role: 'admin', password: 'xxxxxxxxxx'
      }]);
      const response = await request(server)
        .get('/api/users')
        .set('x-auth-token', jwtToken);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('/api/users/:id should return user with specified id', async () => {
      const user = new User(payload);
      const expected = await user.save();
      const response = await request(server)
        .get('/api/users/' + user._id)
        .set('x-auth-token', jwtToken);
      expect(response.body).not.toBeNull();
      expect(response.status).toBe(200);
    });

    it(' api/users/:id should error is we pass invalid user id', async () => {
      const response = await request(server)
        .get('/api/users/' + 1)
        .set('x-auth-token', jwtToken);
      expect(response.status).toBe(500);
    });
  });

  fdescribe('POST', () => {
    it('should create user', async () => {
      const user = new User(payload);
      await user.save();
      const expected = await User.find({ email: user.email });
      expect(expected).not.toBeNull();
    });

    it('should return duplicate email message if we add duplicate email', async () => {
      const user = new User(payload);
      await user.save(); // created user and saved to database
      const response = await request(server)
        .post('/api/users')
        .send(payload);
      expect(response.status).toBe(400);
    });

  });

  fdescribe('PUT', () => {
  });

  fdescribe('DELETE', () => {
  });

  // it('should not return anything if we arent authorized', () => { });
  // it('should delete user', () => { });
  // it('cannot delete user if not admin', () => { });
  // it('should make sure users cant delete other user\'s accounts', () => { });
  // it('should update user', () => { });
  // it('cannot update user if not admin', () => { });
  // it('should make sure users cant update other user\'s accounts', () => { });
});
