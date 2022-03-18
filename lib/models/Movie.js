const req = require('express/lib/request');
const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  released;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.genre = row.genre;
  }
};
