const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('albums routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /albums should return a list of dope albums', async () => {
    const resp = await request(app).get('/albums');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "artist": "9th Wonder",
          "id": "1",
          "spotify_link": "https://open.spotify.com/album/4KKqugfLVZaDA62xZPJnEz?si=mSOaIzrSTTSfa-fjHP-tpg",
          "title": "ZION VII",
          "year": 2022,
        },
        Object {
          "artist": "Björk",
          "id": "2",
          "spotify_link": "https://open.spotify.com/album/5NchVUjB8yqNhqSeBYaFVy?si=Req9nVdtQ8a20CgK0_7uzQ",
          "title": "Fossora",
          "year": 2022,
        },
        Object {
          "artist": "Freddie Gibbs",
          "id": "3",
          "spotify_link": "https://open.spotify.com/album/3PZx4Vntcp5T7UgdfjnFDa?si=eeTJJflLSl-R7_1A1FMzFg",
          "title": "$oul $old $eparately",
          "year": 2022,
        },
        Object {
          "artist": "Meshell Ndegeocello",
          "id": "4",
          "spotify_link": "https://open.spotify.com/album/2AaWyePc8ZelBtReUpDZXw?si=W-27VnpJSNatVqllqG9v_A",
          "title": "The World Has Made Me The Man Of My Dreams",
          "year": 2007,
        },
        Object {
          "artist": "Erykah Badu",
          "id": "5",
          "spotify_link": "https://open.spotify.com/album/3cADvHRdKniF9ELCn1zbGH?si=NmgCoAHeQT2GNAX985xD-g",
          "title": "Mama's Gun",
          "year": 2000,
        },
      ]
    `);
  });

  it('GET /albums/3 should return album details', async () => {
    const resp = await request(app).get('/albums/3');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '3',
      artist: 'Freddie Gibbs',
      title: '$oul $old $eparately',
      year: 2022,
      spotify_link:
        'https://open.spotify.com/album/3PZx4Vntcp5T7UgdfjnFDa?si=eeTJJflLSl-R7_1A1FMzFg',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
