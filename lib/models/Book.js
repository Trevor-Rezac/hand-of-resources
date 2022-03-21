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

  static async updateBookById(id, { title, author, page_count }) {
    const currentBook = await Book.getBookById(id);

    const newTitle = title ?? currentBook.title;
    const newAuthor = author ?? currentBook.author;
    const newPageCount = page_count ?? currentBook.page_count;

    const { rows } = await pool.query(
      `
    UPDATE
      books
    SET
      title=$2, author=$3, page_count=$4
    WHERE
      id=$1
    RETURNING
      *;`,
      [id, newTitle, newAuthor, newPageCount]
    );
    const updatedBook = await Book.insert(rows[0]);
    return updatedBook;
  }
};
