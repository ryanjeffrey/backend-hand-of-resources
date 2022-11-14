const pool = require('../utils/pool');

class Instrument {
  id;
  name;
  family;
  is_electronic;

  constructor({ id, name, family, is_electronic }) {
    this.id = id;
    this.name = name;
    this.family = family;
    this.isElectronic = is_electronic;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from instruments');
    return rows.map((instrument) => new Instrument(instrument));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from instruments where id = $1',
      [id]
    );
    if (!rows[0]) return null;
    return new Instrument(rows[0]);
  }

  static async insert(instrument) {
    const { rows } = await pool.query(
      `
      INSERT INTO instruments (name, family, is_electronic)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [instrument.name, instrument.family, instrument.isElectronic]
    );
    return new Instrument(rows[0]);
  }
}

module.exports = { Instrument };
