-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cars, movies;
-- DROP TABLE IF EXISTS movies;

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  year INT,
  make TEXT NOT NULL,
  model TEXT NOT NULL
);

CREATE TABLE movies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  released INT,
  genre TEXT NOT NULL
);


