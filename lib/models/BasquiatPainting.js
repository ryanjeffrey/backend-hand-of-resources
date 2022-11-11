const pool = require('../utils/pool');

class BasquiatPainting {
  id;
  title;
  year;
  dimensions;
  image;

  constructor({ id, title, year, dimensions, image }) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.dimensions = dimensions;
    this.image = image;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from basquiat_paintings');
    return rows.map((basquiatPainting) => new BasquiatPainting(basquiatPainting));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from basquiat_paintings where id = $1', [id]);
    return new BasquiatPainting(rows[0]);
  }
}

module.exports = { BasquiatPainting };
