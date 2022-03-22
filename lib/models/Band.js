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

  static async getAllBands() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      bands;`);

    const bands = rows.map((row) => new Band(row));
    return bands;
  }

  static async getBandById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      bands
    WHERE
      id=$1;`,
      [id]
    );

    if (!rows[0]) return null;
    const band = new Band(rows[0]);
    return band;
  }
};
