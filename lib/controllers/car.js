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
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      cars;`);
      
    const car = new Car(rows[0]);
    res.send(car);
  });
