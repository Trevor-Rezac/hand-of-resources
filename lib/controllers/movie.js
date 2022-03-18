const { Router } = require('express');
const res = require('express/lib/response');
const { insert } = require('../models/Movie');
const Movie = require('../models/Movie');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await insert({ ...req.body });
    res.send(movie);
  })

  .get('/', async (req, res) => {
    const movies = [
      {
        id: '1',
        title: 'Pulp Fiction',
        released: 1994,
        genre: 'Crime/Drama',
      },
    ];

    res.send(movies);
  });
