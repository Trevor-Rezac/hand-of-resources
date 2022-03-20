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
};
