const { Router } = require('express');
const Show = require('../models/Show');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const show = await Show.insert(req.body);
    res.send(show);
  })

  .get('/', async (req, res) => {
    const shows = await Show.getAllShows();
    res.send(shows);
  })

  .get('/:id', async (req, res) => {
    const show = await Show.getShowById(req.params.id);
    res.send(show);
  })

  .patch('/:id', async (req, res) => {
    const show = {
      id: '1',
      title: 'title',
      seasons: 10,
      network: 'network',
    };

    res.send(show);
  });
