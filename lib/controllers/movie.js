const { Router } = require('express');
const Movie = require('../models/Movie');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert({ ...req.body });
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const movies = await Movie.getAllMovies();

    res.send(movies);
  })

  .get('/:id', async (req, res) => {
    const movie = await Movie.getMovieById(req.params.id);
    res.send(movie);
  })

  .patch('/:id', async (req, res) => {
    const currentMovie = await Movie.getMovieById(req.params.id);

    const newTitle = req.body.title ?? currentMovie.title;
    const newReleased = req.body.released ?? currentMovie.released;
    const newGenre = req.body.genre ?? currentMovie.genre;

    const { rows } = await pool.query(
      `
    UPDATE
      movies
    SET
      title=$2, released=$3, genre=$4
    WHERE
      id=$1
    RETURNING
      *;`,
      [req.params.id, newTitle, newReleased, newGenre]
    );

    const updatedMovie = new Movie(rows[0]);
    res.send(updatedMovie);
  });
