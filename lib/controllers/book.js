const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const book = {
    id: '1',
    title: 'title',
    author: 'author',
    page_count: 500,
  };

  res.send(book);
});
