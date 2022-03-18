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

  it('should create a new car', async () => {
    const res = await request(app).post('/api/v1/cars').send({
      id: '1',
      year: 1969,
      make: 'Ford',
      model: 'Mustang',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      year: 1969,
      make: 'Ford',
      model: 'Mustang',
    });
  });
});
