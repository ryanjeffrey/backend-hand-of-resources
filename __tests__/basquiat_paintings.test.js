const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('basquiat-paintings routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /basquiat-paintings should return a list of Basquiat paintings', async () => {
    const resp = await request(app).get('/basquiat-paintings');
    expect(resp.status).toBe(200);
  });

  afterAll(() => {
    pool.end();
  });
});
