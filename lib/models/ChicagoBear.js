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
  
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from chicago_bears where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new ChicagoBear(rows[0]);
  }
}

module.exports = { ChicagoBear };
