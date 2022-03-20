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

  it('should insert a book into the db', async () => {
    const res = await request(app).post('/api/v1/books').send({
      title: 'title',
      author: 'author',
      page_count: 500,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'title',
      author: 'author',
      page_count: 500,
    });
  });
});
