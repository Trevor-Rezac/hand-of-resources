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
};
