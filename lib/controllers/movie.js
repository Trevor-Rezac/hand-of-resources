const { Router } = require('express');
const Movie = require('../models/Movie');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `
  INSERT INTO
    movies(title, released, genre)
  VALUES($1, $2, $3)
  RETURNING
    *;`,
    [req.body.title, req.body.released, req.body.genre]
  );

  const movie = new Movie(rows[0]);

  res.send(movie);
});
