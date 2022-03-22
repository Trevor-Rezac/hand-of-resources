const { Router } = require('express');
const pool = require('../utils/pool');
const Band = require('../models/Band');

module.exports = Router()
  .post('/', async (req, res) => {
    const band = await Band.insert(req.body);
    res.send(band);
  })

  .get('/', async (req, res) => {
    const bands = await Band.getAllBands();
    res.send(bands);
  })

  .get('/:id', async (req, res) => {
    const band = await Band.getBandById(req.params.id);
    res.send(band);
  });
