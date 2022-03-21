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

  it('should insert a show', async () => {
    const show = {
      id: '1',
      title: 'Rick and Morty',
      seasons: 5,
      network: 'Adult Swim',
    };

    const res = await request(app).post('/api/v1/shows').send(show);

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Rick and Morty',
      seasons: 5,
      network: 'Adult Swim',
    });
  });
});
