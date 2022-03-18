const { Router } = require('express');
const { insert } = require('../models/Movie');
const Movie = require('../models/Movie');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const movie = await insert({ ...req.body });
  res.send(movie);
});
