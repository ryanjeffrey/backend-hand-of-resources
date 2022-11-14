const pool = require('../utils/pool');

class Car {
  id;
  make;
  model;
  fuel_type;

  constructor({ id, make, model, fuel_type }) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.fuelType = fuel_type;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from cars');
    return rows.map((car) => new Car(car));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cars where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Car(rows[0]);
  }
}

module.exports = { Car };
