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
};
