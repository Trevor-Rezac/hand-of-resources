const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;
  page_count;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.page_count = row.page_count;
  }

  static async insert({ title, author, page_count }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      books(title, author, page_count)
    VALUES($1, $2, $3)
    RETURNING
      *;`,
      [title, author, page_count]
    );
    const book = new Book(rows[0]);
    return book;
  }

  static async getAllBooks() {
    const { rows } = await pool.query(`
    SELECT
      *
    FROM
      books;`);
    const books = rows.map((row) => new Book(row));
    return books;
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      books
    WHERE
      id=$1;`,
      [id]
    );
    const book = await Book.insert(rows[0]);
    return book;
  }
};
