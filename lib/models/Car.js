const pool = require('../utils/pool');

module.exports = class Car {
  id;
  year;
  make;
  model;

  constructor(row) {
    this.id = row.id;
    this.year = row.year;
    this.make = row.make;
    this.model = row.model;
  }

  static async create({ year, make, model }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      cars(year, make, model)
    VALUES($1, $2, $3)
    RETURNING
      *;
    `,
      [year, make, model]
    );
    const car = new Car(rows[0]);
    return car;
  }
};
