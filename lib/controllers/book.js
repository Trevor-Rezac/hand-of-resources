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
    const book = await Book.getBookById(req.params.id);
    res.send(book);
  })

  .patch('/:id', async (req, res) => {
    const currentBook = await Book.getBookById(req.params.id);

    const newTitle = req.body.title ?? currentBook.title;
    const newAuthor = req.body.author ?? currentBook.author;
    const newPageCount = req.body.page_count ?? currentBook.page_count;

    const { rows } = await pool.query(
      `
    UPDATE
      books
    SET
      title=$2, author=$3, page_count=$4
    WHERE
      id=$1
    RETURNING
      *;`,
      [req.params.id, newTitle, newAuthor, newPageCount]
    );
    const updatedBook = await Book.insert(rows[0]);
    res.send(updatedBook);
  });
