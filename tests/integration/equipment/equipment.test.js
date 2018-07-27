let server;
const request = require('supertest');

describe('/api/users', () => {
  beforeEach(() => { server = require('../../../index'); });
  afterEach(() => { server.close(); });
  it('should return all equipment', () => {
  });

  it('should return single equipment', () => {
  });

  it('should create equipment', () => {
  });

  it('should delete equipment', () => {
  });

  it('should update equipment', () => {
  });

});
