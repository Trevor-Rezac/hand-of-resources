const { Router } = require('express');
const Book = require('../models/Book');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/', async (req, res) => {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      books;`);
    const books = rows.map((row) => new Book(row));
    res.send(books);
  });
