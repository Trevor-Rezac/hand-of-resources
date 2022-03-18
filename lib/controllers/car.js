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
    const car = await Car.getCarById(req.params.id);
    res.send(car);
  })

  .delete('/:id', async (req, res) => {
    const car = await Car.deleteCarById(req.params.id);
    res.send(car);
  })

  .patch('/:id', async (req, res) => {
    const currentCar = await Car.getCarById(req.params.id);

    if (!currentCar) return null;

    const newYear = req.body.year ?? currentCar.year;
    const newMake = req.body.make ?? currentCar.make;
    const newModel = req.body.model ?? currentCar.model;

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
      [req.params.id, newYear, newMake, newModel]
    );

    const updatedCar = new Car(rows[0]);

    res.send(updatedCar);
  });
