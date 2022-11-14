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
    const { rows } = await pool.query('SELECT * from cars where id = $1', [id]);
    if (!rows[0]) return null;
    return new Car(rows[0]);
  }

  static async insert(car) {
    const { rows } = await pool.query(
      `
      INSERT INTO cars (make, model, fuel_type)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [car.make, car.model, car.fuelType]
    );
    return new Car(rows[0]);
  }

  static async updateById(id, args) {
    const car = await Car.getById(id);
    if (!car) return null;
    const updatedData = { ...car, ...args };

    const { rows } = await pool.query(
      `
      UPDATE cars
      SET make = $2, model = $3, fuel_type = $4
      WHERE id = $1
      RETURNING *  
      `,
      [id, updatedData.make, updatedData.model, updatedData.fuelType]
    );
    return new Car(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from cars
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Car(rows[0]);
  }
}

module.exports = { Car };
