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
    const movie = {
      id: '1',
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    };

    res.send(movie);
  });
