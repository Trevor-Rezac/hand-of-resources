const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
