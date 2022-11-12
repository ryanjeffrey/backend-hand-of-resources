const pool = require('../utils/pool');

class ChicagoBear {
  id;
  name;
  number;
  position;
  experience;

  constructor({ id, name, number, position, experience }) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.position = position;
    this.experience = experience;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from chicago_bears');
    return rows.map((chicagoBear) => new ChicagoBear(chicagoBear));
  }
}

module.exports = { ChicagoBear };
