const { Router } = require('express');
const pool = require('../utils/pool');
const Band = require('../models/Band');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `
  INSERT INTO
    bands(name, genre, albums)
  VALUES($1, $2, $3)
  RETURNING
    *
    `,
    [req.body.name, req.body.genre, req.body.albums]
  );
  const band = new Band(rows[0]);
  res.send(band);
});
