const pool = require('../utils/pool');

module.exports = class Band {
  id;
  name;
  genre;
  albums;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.genre = row.genre;
    this.albums = row.albums;
  }

  static async insert({ name, genre, albums }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      bands(name, genre, albums)
    VALUES($1, $2, $3)
    RETURNING
      *
      `,
      [name, genre, albums]
    );
    const band = new Band(rows[0]);
    return band;
  }
};
