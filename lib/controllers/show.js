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
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      shows
    WHERE
      id=$1;`,
      [req.params.id]
    );

    if (!rows) return null;
    const show = new Show(rows[0]);
    res.send(show);
  });
