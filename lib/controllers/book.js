const { Router } = require('express');
const Book = require('../models/Book');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const book = await Book.insert(req.body);
  res.send(book);
});
