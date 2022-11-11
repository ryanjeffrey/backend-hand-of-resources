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
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "dimensions": "249 x 289.5 cm",
          "id": "1",
          "image": "https://blog.singulart.com/wp-content/uploads/2020/02/riding-with-death.jpg",
          "title": "Riding with Death",
          "year": 1988,
        },
        Object {
          "dimensions": "207 x 175.9 cm",
          "id": "2",
          "image": "https://uploads5.wikiart.org/images/jean-michel-basquiat/head.jpg!Large.jpg",
          "title": "Skull",
          "year": 1981,
        },
        Object {
          "dimensions": "260.8 x 151.8 cm",
          "id": "3",
          "image": "https://uploads7.wikiart.org/images/jean-michel-basquiat/tuxedo.jpg!Large.jpg",
          "title": "Tuxedo",
          "year": 1982,
        },
        Object {
          "dimensions": "106.5 x 106.5 cm",
          "id": "4",
          "image": "https://uploads1.wikiart.org/images/jean-michel-basquiat/sugar-ray-robinson.jpg!Large.jpg",
          "title": "Sugar Ray Robinson",
          "year": 1982,
        },
        Object {
          "dimensions": "57 x 76.5 cm",
          "id": "5",
          "image": "https://uploads5.wikiart.org/images/jean-michel-basquiat/king-alphonso.jpg!Large.jpg",
          "title": "King Alphonso",
          "year": 1983,
        },
      ]
    `);
  });

  it('GET /basquiat-paintings/1 should return painting details', async () => {
    const resp = await request(app).get('/basquiat-paintings/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      title: 'Riding with Death',
      year: 1988,
      dimensions: '249 x 289.5 cm',
      image:
        'https://blog.singulart.com/wp-content/uploads/2020/02/riding-with-death.jpg',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
