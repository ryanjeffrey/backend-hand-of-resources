const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cars routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /cars should return a list of cars', async () => {
    const resp = await request(app).get('/cars');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "fuelType": "gas",
          "id": "1",
          "make": "Porsche",
          "model": "Macan",
        },
        Object {
          "fuelType": "electric",
          "id": "2",
          "make": "Rivian",
          "model": "R1S",
        },
        Object {
          "fuelType": "gas",
          "id": "3",
          "make": "Volkswagen",
          "model": "Tiguan",
        },
        Object {
          "fuelType": "hybrid",
          "id": "4",
          "make": "Toyota",
          "model": "Rav4 Hybrid",
        },
        Object {
          "fuelType": "diesel",
          "id": "5",
          "make": "Mercedes-Benz",
          "model": "E350 BlueTEC",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
