let server;
const request = require('supertest');

describe('/api/users', () => {
  beforeEach(() => { server = require('../../../index'); });
  afterEach(() => { server.close(); });
  it('should return all rooms', () => {
  });

  it('should return single room', () => {
  });

  it('should create room', () => {
  });

  it('should delete room', () => {
  });

  it('should update room', () => {
  });

});
