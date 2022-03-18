const { Router } = require('express');
const pool = require('../utils/pool');
const Car = require('../models/Car');

//prettier-ignore
module.exports = Router()
  .post('/', async (req, res) => {
    const { rows } = await pool.query(`
    INSERT INTO
      cars(year, make, model)
    VALUES($1, $2, $3)
    RETURNING
      *;
    `, [req.body.year, req.body.make, req.body.model]);
    const car = new Car(rows[0]);
    res.send(car);
  });
