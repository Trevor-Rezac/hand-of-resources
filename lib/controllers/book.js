const { Router } = require('express');
const Book = require('../models/Book');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `
  INSERT INTO
    books(title, author, page_count)
  VALUES($1, $2, $3)
  RETURNING
    *;`,
    [req.body.title, req.body.author, req.body.page_count]
  );
  const book = new Book(rows[0]);
  res.send(book);
});
