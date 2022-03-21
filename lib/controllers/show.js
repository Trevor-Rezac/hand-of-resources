const { Router } = require('express');
const Show = require('../models/Show');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `
  INSERT INTO
    shows(title, seasons, network)
  VALUES($1, $2, $3)
  RETURNING
    *;`,
    [req.body.title, req.body.seasons, req.body.network]
  );

  const show = new Show(rows[0]);
  res.send(show);
});
