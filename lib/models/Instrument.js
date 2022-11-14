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
}

module.exports = { Instrument };
