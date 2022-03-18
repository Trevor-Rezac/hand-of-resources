const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const car = {
    id: '1',
    year: 1969,
    make: 'Ford',
    model: 'Mustang',
  };

  res.send(car);
});
