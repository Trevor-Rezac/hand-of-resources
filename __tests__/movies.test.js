const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');
const req = require('express/lib/request');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a new movie', async () => {
    const res = await request(app).post('/api/v1/movies').send({
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    });
  });

  it('should list all movies', async () => {
    await Movie.insert({
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    });

    const res = await request(app).get('/api/v1/movies');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'Pulp Fiction',
        released: 1994,
        genre: 'Crime/Drama',
      },
    ]);
  });

  it('should get a movie by Id', async () => {
    const movie = await Movie.insert({
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    });

    const res = await request(app).get(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    });
  });

  it('should update a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'Poop Fiction',
      released: 1996,
      genre: 'Crime/Crama',
    });

    const res = await request(app).patch(`/api/v1/movies/${movie.id}`).send({
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    });

    const expected = {
      id: expect.any(String),
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    };

    expect(res.body).toEqual(expected);
  });

  it('should delete a movie by Id', async () => {
    const movie = await Movie.insert({
      title: 'Poop Fiction',
      released: 1996,
      genre: 'Crime/Crama',
    });
    console.log(movie.id);
    const res = await request(app).delete(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Poop Fiction',
      released: 1996,
      genre: 'Crime/Crama',
    });
    // expect(await Movie.getMovieById(movie.id)).toBeNull();
  });
});
