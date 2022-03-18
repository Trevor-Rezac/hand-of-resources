const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const movie = {
    id: '1',
    title: 'Pulp Fiction',
    released: 1994,
    genre: 'Crime/Drama',
  };

  res.send(movie);
});
