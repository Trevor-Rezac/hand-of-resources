const pool = require('../utils/pool');
module.exports = class Show {
  id;
  title;
  seasons;
  network;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.seasons = row.seasons;
    this.network = row.network;
  }

  static async insert({ title, seasons, network }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      shows(title, seasons, network)
    VALUES($1, $2, $3)
    RETURNING
      *;`,
      [title, seasons, network]
    );

    const show = new Show(rows[0]);
    return show;
  }
};
