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
    return rows.map(
      (basquiatPainting) => new BasquiatPainting(basquiatPainting)
    );
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from basquiat_paintings where id = $1',
      [id]
    );
    if (!rows[0]) return null;
    return new BasquiatPainting(rows[0]);
  }

  static async insert(basquiatPainting) {
    const { rows } = await pool.query(
      `
      INSERT INTO basquiat_paintings (title, year, dimensions, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        basquiatPainting.title,
        basquiatPainting.year,
        basquiatPainting.dimensions,
        basquiatPainting.image,
      ]
    );
    return new BasquiatPainting(rows[0]);
  }

  static async updateById(id, args) {
    const basquiatPainting = await BasquiatPainting.getById(id);
    if (!basquiatPainting) return null;
    const updatedData = { ...basquiatPainting, ...args };

    const { rows } = await pool.query(
      `
      UPDATE basquiat_paintings
      SET title = $2, year = $3, dimensions = $4, image = $5
      WHERE id = $1
      RETURNING *  
      `,
      [
        id,
        updatedData.title,
        updatedData.year,
        updatedData.dimensions,
        updatedData.image,
      ]
    );
    return new BasquiatPainting(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from basquiat_paintings
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new BasquiatPainting(rows[0]);
  }
}

module.exports = { BasquiatPainting };
