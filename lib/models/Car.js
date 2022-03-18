module.exports = class Car {
  id;
  year;
  make;
  model;

  constructor(row) {
    this.id = row.id;
    this.year = row.year;
    this.make = row.make;
    this.model = row.model;
  }
};
