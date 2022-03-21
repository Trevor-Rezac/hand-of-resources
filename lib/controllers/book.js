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
    const updatedBook = await Book.updateBookById(req.params.id, req.body);
    res.send(updatedBook);
  })

  .delete('/:id', async (req, res) => {
    const book = await Book.deleteBookById(req.params.id);
    res.send(book);
  });
