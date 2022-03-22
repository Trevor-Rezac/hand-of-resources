const { Router } = require('express');
const pool = require('../utils/pool');
const Band = require('../models/Band');

module.exports = Router()
  .post('/', async (req, res) => {
    const band = await Band.insert(req.body);
    res.send(band);
  })

  .get('/', async (req, res) => {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      bands;`);

    const bands = rows.map((row) => new Band(row));
    res.send(bands);
  });
