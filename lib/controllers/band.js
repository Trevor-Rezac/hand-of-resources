const { Router } = require('express');
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
  })

  .patch('/:id', async (req, res) => {
    const band = await Band.updateBandById(req.params.id, req.body);
    res.send(band);
  })

  .delete('/:id', async (req, res) => {
    const band = await Band.deleteBandById(req.params.id);
    res.send(band);
  });
