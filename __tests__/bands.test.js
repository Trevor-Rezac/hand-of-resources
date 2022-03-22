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

  it('should insert a new band', async () => {
    const band = {
      name: 'Red Hot Chili Peppers',
      genre: 'Rock',
      albums: 12,
    };

    const res = await request(app).post('/api/v1/bands').send(band);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Red Hot Chili Peppers',
      genre: 'Rock',
      albums: 12,
    });
  });
});
