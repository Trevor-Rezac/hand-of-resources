const { Router } = require('express');
const Book = require('../models/Book');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();
    res.send(books);
  })

  .get('/:id', async (req, res) => {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      books
    WHERE
      id=$1;`,
      [req.params.id]
    );
    const book = await Book.insert(rows[0]);
    res.send(book);
  });
