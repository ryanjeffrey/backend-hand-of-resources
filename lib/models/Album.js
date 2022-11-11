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
    this.spotify_link = spotify_link;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from albums');
    return rows.map(
      (album) => new Album(album)
    );
  }
}

module.exports = { Album };
