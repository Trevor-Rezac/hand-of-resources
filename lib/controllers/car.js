const { Router } = require('express');
const pool = require('../utils/pool');
const Car = require('../models/Car');

module.exports = Router()
  .post('/', async (req, res) => {
    const car = await Car.create(req.body);

    res.send(car);
  })

  .get('/', async (req, res) => {
    const cars = await Car.getAllCars();
    res.send(cars);
  })

  .get('/:id', async (req, res) => {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      cars
    WHERE
      id=$1;
      `,
      [req.params.id]
    );
    console.log(rows);
    if (!rows[0]) return null;

    const car = new Car(rows[0]);
    res.send(car);
  });
