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

  static async getAllMovies() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      movies;`);

    const movies = rows.map((row) => new Movie(row));
    return movies;
  }

  static async getMovieById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        movies
      WHERE
        id=$1;`,
      [id]
    );
    const movie = new Movie(rows[0]);
    return movie;
  }

  static async updateMovieById(id, { title, released, genre }) {
    const currentMovie = await Movie.getMovieById(id);

    const newTitle = title ?? currentMovie.title;
    const newReleased = released ?? currentMovie.released;
    const newGenre = genre ?? currentMovie.genre;

    const { rows } = await pool.query(
      `
    UPDATE
      movies
    SET
      title=$2, released=$3, genre=$4
    WHERE
      id=$1
    RETURNING
      *;`,
      [id, newTitle, newReleased, newGenre]
    );

    const updatedMovie = new Movie(rows[0]);
    return updatedMovie;
  }
};
