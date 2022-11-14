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

  it('GET /instruments/5 should return instrument details', async () => {
    const resp = await request(app).get('/instruments/5');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '5',
      name: 'Kalimba',
      family: 'Idiophone',
      isElectronic: false,
    });
  });

  it('POST /instruments should create a new instrument in the database', async () => {
    const newInstrument = {
      name: 'MPC',
      family: 'Electronic Percussion',
      isElectronic: true,
    };
    const resp = await request(app).post('/instruments').send(newInstrument);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "family": "Electronic Percussion",
        "id": "6",
        "isElectronic": true,
        "name": "MPC",
      }
    `);
  });

  it('PUT /instruments/2 should update instrument with id #2', async () => {
    const resp = await request(app)
      .put('/instruments/2')
      .send({ family: 'Percussion' });
    expect(resp.status).toBe(200);
    expect(resp.body.family).toBe('Percussion');
  });

  afterAll(() => {
    pool.end();
  });
});
