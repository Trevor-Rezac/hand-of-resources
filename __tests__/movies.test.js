const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.skip('should create a new movie', async () => {
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

  it.skip('should list all movies', async () => {
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

  it.skip('should get a movie by Id', async () => {
    const movie = await Movie.insert({
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    });

    const res = await request(app).get(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual(movie);
  });

  it.skip('should update a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'Pulp Fiction',
      released: 1996,
      genre: 'Crime/Drama',
    });

    const res = await request(app).patch(`/api/v1/movies/${movie.id}`).send({
      released: 1994,
    });

    const expected = {
      id: expect.any(String),
      title: 'Pulp Fiction',
      released: 1994,
      genre: 'Crime/Drama',
    };

    expect(res.body).toEqual(expected);
  });

  it.skip('should delete a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'Wrong Movie',
      released: 2009,
      genre: 'Unknown',
    });

    const res = await request(app).delete(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual(movie);
    expect(await Movie.getMovieById(movie.id)).toBeNull();
  });
});
