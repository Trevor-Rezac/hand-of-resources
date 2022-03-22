-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cars, movies, books, shows, bands;

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

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  page_count INT
);

CREATE TABLE shows (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  title TEXT NOT NULL,
  seasons INT,
  network TEXT NOT NULL
);

CREATE TABLE bands (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  genre TEXT NOT NULL,
  albums INT
);