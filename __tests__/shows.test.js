const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Show = require('../lib/models/Show');

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

  it('should list all shows', async () => {
    await Show.insert({
      title: 'show title',
      seasons: 4,
      network: 'show network',
    });

    const res = await request(app).get('/api/v1/shows');

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'show title',
      seasons: 4,
      network: 'show network',
    });
  });
});
