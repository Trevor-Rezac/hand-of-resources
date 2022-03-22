const { Router } = require('express');
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
    const updatedCar = await Car.updateCarById(req.params.id, req.body);
    res.send(updatedCar);
  });
