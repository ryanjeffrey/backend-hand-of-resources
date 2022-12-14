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

  it('GET /cars/2 should return car details', async () => {
    const resp = await request(app).get('/cars/2');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '2',
      make: 'Rivian',
      model: 'R1S',
      fuelType: 'electric',
    });
  });

  it('POST /cars should create a new car in the database', async () => {
    const newCar = {
      make: 'Hyundai',
      model: 'Tucson Hybrid',
      fuelType: 'hybrid',
    };
    const resp = await request(app).post('/cars').send(newCar);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "fuelType": "hybrid",
        "id": "6",
        "make": "Hyundai",
        "model": "Tucson Hybrid",
      }
    `);
  });

  it('PUT /cars/1 should update car with id #1', async () => {
    const resp = await request(app).put('/cars/1').send({ model: 'Cayenne' });
    expect(resp.status).toBe(200);
    expect(resp.body.model).toBe('Cayenne');
  });

  it('GET /cars/xyz should return a 404 error', async () => {
    const resp = await request(app).get('/cars/96311');
    expect(resp.status).toBe(404);
  });

  it('DELETE /cars/4 should delete car #4', async () => {
    const resp = await request(app).delete('/cars/4');
    expect(resp.status).toBe(204);

    const getResp = await request(app).get('/cars/4');
    expect(getResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
