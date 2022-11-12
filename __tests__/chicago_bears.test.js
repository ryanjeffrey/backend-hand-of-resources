const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('chicago-bears routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /chicago-bears should return a list of Chicago Bears', async () => {
    const resp = await request(app).get('/chicago-bears');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "experience": 2,
          "id": "1",
          "name": "Justin Fields",
          "number": 1,
          "position": "QB",
        },
        Object {
          "experience": 3,
          "id": "2",
          "name": "Chase Claypool",
          "number": 10,
          "position": "WR",
        },
        Object {
          "experience": 3,
          "id": "3",
          "name": "Darnell Mooney",
          "number": 11,
          "position": "WR",
        },
        Object {
          "experience": 1,
          "id": "4",
          "name": "Jaquan Brisker",
          "number": 9,
          "position": "S",
        },
        Object {
          "experience": 6,
          "id": "5",
          "name": "Eddie Jackson",
          "number": 4,
          "position": "S",
        },
      ]
    `);
  });
  
  it('GET /chicago-bears/4 should return player details', async () => {
    const resp = await request(app).get('/chicago-bears/4');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '4',
      name: 'Jaquan Brisker',
      number: 9,
      position: 'S',
      experience: 1
    });
  });

  afterAll(() => {
    pool.end();
  });
});
