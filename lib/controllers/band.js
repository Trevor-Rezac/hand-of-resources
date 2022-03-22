const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const car = {
    id: '1',
    name: 'Red Hot Chili Peppers',
    genre: 'Rock',
    albums: 12,
  };

  res.send(car);
});
