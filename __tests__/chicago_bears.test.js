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
      experience: 1,
    });
  });

  it('POST /chicago-bears should create a new player in the database', async () => {
    const newPlayer = {
      name: 'Jaylon Johnson',
      number: 33,
      position: 'CB',
      experience: 3,
    };
    const resp = await request(app).post('/chicago-bears').send(newPlayer);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "experience": 3,
        "id": "6",
        "name": "Jaylon Johnson",
        "number": 33,
        "position": "CB",
      }
    `);
  });

  it('PUT /chicago-bears/2 should update player with id #2', async () => {
    const resp = await request(app)
      .put('/chicago-bears/2')
      .send({ position: 'TE' });
    expect(resp.status).toBe(200);
    expect(resp.body.position).toBe('TE');
  });

  it('GET /chicago-bears/xyz should return a 404 error', async () => {
    const resp = await request(app).get('/chicago-bears/4122');
    expect(resp.status).toBe(404);
  });

  it('DELETE /chicago-bears/5 should delete player #5', async () => {
    const resp = await request(app).delete('/chicago-bears/5');
    expect(resp.status).toBe(204);

    const getResp = await request(app).get('/chicago-bears/5');
    expect(getResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
