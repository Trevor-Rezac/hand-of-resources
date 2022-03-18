const { Router } = require('express');
const Movie = require('../models/Movie');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert({ ...req.body });
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      movies;`);

    const movies = rows.map((row) => new Movie(row));

    res.send(movies);
  });
