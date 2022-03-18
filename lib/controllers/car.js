const { Router } = require('express');
const pool = require('../utils/pool');
const Car = require('../models/Car');

//prettier-ignore
module.exports = Router()
  .post('/', async (req, res) => {
    const car = await Car.create(req.body);

    res.send(car);
  })
  
  .get('/', async (req, res) => {
    const cars = await Car.getAllCars();
    res.send(cars);
  });
