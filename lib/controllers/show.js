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
    const currentShow = await Show.getShowById(req.params.id);

    if (!currentShow) return null;

    const newTitle = req.body.title ?? currentShow.title;
    const newSeasons = req.body.seasons ?? currentShow.seasons;
    const newNetwork = req.body.network ?? currentShow.network;

    const { rows } = await pool.query(
      `
    UPDATE
      shows
    SET
      title=$2, seasons=$3, network=$4
    WHERE
      id=$1
    RETURNING
      *;`,
      [req.params.id, newTitle, newSeasons, newNetwork]
    );

    const updatedShow = new Show(rows[0]);
    res.send(updatedShow);
  });
