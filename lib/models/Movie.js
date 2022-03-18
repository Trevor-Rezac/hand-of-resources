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

  static async insert({ title, released, genre }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      movies(title, released, genre)
    VALUES($1, $2, $3)
    RETURNING
      *;`,
      [title, released, genre]
    );

    const movie = new Movie(rows[0]);
    return movie;
  }
};
