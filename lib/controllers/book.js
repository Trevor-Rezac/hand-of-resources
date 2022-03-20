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
    const book = {
      id: '1',
      title: 'some book',
      author: 'some author',
      page_count: 100,
    };

    res.send(book);
  });