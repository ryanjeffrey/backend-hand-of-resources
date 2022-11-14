const pool = require('../utils/pool');

class Album {
  id;
  artist;
  title;
  year;
  spotify_link;

  constructor({ id, artist, title, year, spotify_link }) {
    this.id = id;
    this.artist = artist;
    this.title = title;
    this.year = year;
    this.spotifyLink = spotify_link;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from albums');
    return rows.map((album) => new Album(album));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from albums where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Album(rows[0]);
  }

  static async insert(album) {
    const { rows } = await pool.query(
      `
      INSERT INTO albums (artist, title, year, spotify_link)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [album.artist, album.title, album.year, album.spotifyLink]
    );
    return new Album(rows[0]);
  }

  static async updateById(id, args) {
    const album = await Album.getById(id);
    if (!album) return null;
    const updatedData = { ...album, ...args };

    const { rows } = await pool.query(
      `
      UPDATE albums
      SET artist = $2, title = $3, year = $4, spotify_link = $5
      WHERE id = $1
      RETURNING *  
      `,
      [
        id,
        updatedData.artist,
        updatedData.title,
        updatedData.year,
        updatedData.spotifyLink,
      ]
    );
    return new Album(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from albums
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Album(rows[0]);
  }
}

module.exports = { Album };
