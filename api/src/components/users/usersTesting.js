const request = require('supertest');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const app = require('../../../app');

describe('sdsd', () => {
  it('Fails', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Fran',
        lastname: 'Pepe',
        email: 'd',
      });
    expect(response.status).to.eql(401);
  });
});
