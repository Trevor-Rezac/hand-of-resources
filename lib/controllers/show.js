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
    const updatedShow = await Show.updateShowById(req.params.id, req.body);
    res.send(updatedShow);
  })

  .delete('/:id', async (req, res) => {
    const show = await Show.deleteShowById(req.params.id);
    res.send(show);
  });
