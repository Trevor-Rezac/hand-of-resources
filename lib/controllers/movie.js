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
    const updatedMovie = await Movie.updateMovieById(req.params.id, req.body);
    res.send(updatedMovie);
  })

  .delete('/:id', async (req, res) => {
    const movie = await Movie.deleteMovieById(req.params.id);
    res.send(movie);
  });
