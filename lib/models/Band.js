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

  static async updateBandById(id, { name, genre, albums }) {
    const currentBand = await Band.getBandById(id);

    if (!currentBand) return null;

    const newName = name ?? currentBand.name;
    const newGenre = genre ?? currentBand.genre;
    const newAlbums = albums ?? currentBand.albums;

    const { rows } = await pool.query(
      `
    UPDATE
      bands
    SET
      name=$2, genre=$3, albums=$4
    WHERE
      id=$1
    RETURNING
      *`,
      [id, newName, newGenre, newAlbums]
    );

    const band = new Band(rows[0]);
    return band;
  }

  static async deleteBandById(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM
      bands
    WHERE
      id=$1
    RETURNING
      *`,
      [id]
    );

    const band = new Band(rows[0]);
    return band;
  }
};
