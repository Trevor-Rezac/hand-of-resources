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

  static async getAllCars() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      cars;`);

    const cars = rows.map((row) => new Car(row));
    return cars;
  }

  static async getCarById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      cars
    WHERE
      id=$1;
      `,
      [id]
    );

    if (!rows[0]) return null;

    const car = new Car(rows[0]);
    return car;
  }

  static async deleteCarById(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM
      cars
    WHERE
      id=$1
    RETURNING
      *;`,
      [id]
    );

    const car = new Car(rows[0]);
    return car;
  }

  static async updateCarById(id, { year, make, model }) {
    const currentCar = await Car.getCarById(id);

    if (!currentCar) return null;

    const newYear = year ?? currentCar.year;
    const newMake = make ?? currentCar.make;
    const newModel = model ?? currentCar.model;

    const { rows } = await pool.query(
      `
    UPDATE
      cars
    SET
      year=$2, make=$3, model=$4
    WHERE
      id=$1
    RETURNING
      *;
    `,
      [id, newYear, newMake, newModel]
    );

    const updatedCar = new Car(rows[0]);
    return updatedCar;
  }
};
