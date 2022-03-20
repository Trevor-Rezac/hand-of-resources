const { Router } = require('express');
const Book = require('../models/Book');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/', async (req, res) => {
    const books = [
      {
        id: '1',
        title: 'book book',
        author: 'author',
        page_count: 250,
      },
    ];

    res.send(books);
  });
