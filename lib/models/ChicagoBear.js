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
    const { rows } = await pool.query(
      'SELECT * from chicago_bears where id = $1',
      [id]
    );
    if (!rows[0]) return null;
    return new ChicagoBear(rows[0]);
  }

  static async insert(chicagoBear) {
    const { rows } = await pool.query(
      `
      INSERT INTO chicago_bears (name, number, position, experience)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        chicagoBear.name,
        chicagoBear.number,
        chicagoBear.position,
        chicagoBear.experience,
      ]
    );
    return new ChicagoBear(rows[0]);
  }

  static async updateById(id, args) {
    const chicagoBear = await ChicagoBear.getById(id);
    if (!chicagoBear) return null;
    const updatedData = { ...chicagoBear, ...args };

    const { rows } = await pool.query(
      `
      UPDATE chicago_bears
      SET name = $2, number = $3, position = $4, experience = $5
      WHERE id = $1
      RETURNING *  
      `,
      [
        id,
        updatedData.name,
        updatedData.number,
        updatedData.position,
        updatedData.experience,
      ]
    );
    return new ChicagoBear(rows[0]);
  }
}

module.exports = { ChicagoBear };
