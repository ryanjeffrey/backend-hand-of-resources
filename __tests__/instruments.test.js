const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('instruments routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /instruments should return a list of musical instruments', async () => {
    const resp = await request(app).get('/instruments');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "family": "String",
          "id": "1",
          "isElectronic": false,
          "name": "Guitar",
        },
        Object {
          "family": "Membrane",
          "id": "2",
          "isElectronic": false,
          "name": "Drum Set",
        },
        Object {
          "family": "Keyboard",
          "id": "3",
          "isElectronic": true,
          "name": "Synthesizer",
        },
        Object {
          "family": "Keyboard",
          "id": "4",
          "isElectronic": false,
          "name": "Hammond B3 Organ",
        },
        Object {
          "family": "Idiophone",
          "id": "5",
          "isElectronic": false,
          "name": "Kalimba",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});