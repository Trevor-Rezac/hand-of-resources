const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const show = {
    id: '1',
    title: 'Rick and Morty',
    seasons: 5,
    network: 'Adult Swim',
  };

  res.send(show);
});
