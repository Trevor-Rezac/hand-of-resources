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

  static async getAllShows() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      shows;`);
    const shows = rows.map((row) => new Show(row));
    return shows;
  }

  static async getShowById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      shows
    WHERE
      id=$1;`,
      [id]
    );

    if (!rows[0]) return null;
    const show = new Show(rows[0]);
    return show;
  }

  static async updateShowById(id, { title, seasons, network }) {
    const currentShow = await Show.getShowById(id);

    if (!currentShow) return null;

    const newTitle = title ?? currentShow.title;
    const newSeasons = seasons ?? currentShow.seasons;
    const newNetwork = network ?? currentShow.network;

    const { rows } = await pool.query(
      `
    UPDATE
      shows
    SET
      title=$2, seasons=$3, network=$4
    WHERE
      id=$1
    RETURNING
      *;`,
      [id, newTitle, newSeasons, newNetwork]
    );

    const updatedShow = new Show(rows[0]);
    return updatedShow;
  }

  static async deleteShowById(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM
      shows
    WHERE
      id=$1
    RETURNING
      *;`,
      [id]
    );

    if (!rows[0]) return null;
    const show = new Show(rows[0]);
    return show;
  }
};
