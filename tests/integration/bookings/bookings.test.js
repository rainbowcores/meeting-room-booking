let server;
const request = require('supertest');

describe('/api/users', () => {
  beforeEach(() => { server = require('../../../index'); });
  afterEach(() => { server.close(); });
  it('should return all bookings', () => {
  });

  it('should return single booking', () => {
  });

  it('should create booking', () => {
  });

  it('should delete booking', () => {
  });

  it('should update booking', () => {
  });

});
