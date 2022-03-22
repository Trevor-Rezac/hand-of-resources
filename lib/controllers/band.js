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
  })

  .patch('/:id', async (req, res) => {
    const currentBand = await Band.getBandById(req.params.id);

    if (!currentBand) return null;

    const newName = req.body.name ?? currentBand.name;
    const newGenre = req.body.genre ?? currentBand.genre;
    const newAlbums = req.body.albums ?? currentBand.albums;

    const { rows } = await pool.query(
      `
    UPDATE
      bands
    SET
      name=$2, genre=$3, albums=$4
    WHERE
      id=$1
    RETURNING
      *`,
      [req.params.id, newName, newGenre, newAlbums]
    );

    const band = new Band(rows[0]);
    res.send(band);
  });
