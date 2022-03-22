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

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'show title',
        seasons: 4,
        network: 'show network',
      },
    ]);
  });

  it('should get a show by the id', async () => {
    const show = await Show.insert({
      title: 'title',
      seasons: 1,
      network: 'network',
    });

    const res = await request(app).get(`/api/v1/shows/${show.id}`);

    expect(res.body).toEqual(show);
  });

  it('should update a show by the id', async () => {
    const show = await Show.insert({
      title: 'titl',
      seasons: 10,
      network: 'netwok',
    });

    const res = await request(app).patch(`/api/v1/shows/${show.id}`).send({
      title: 'title',
      network: 'network',
    });

    const expected = {
      id: expect.any(String),
      title: 'title',
      seasons: 10,
      network: 'network',
    };

    expect(res.body).toEqual(expected);
  });

  it('should delete a show by the id', async () => {
    const show = await Show.insert({
      title: 'wrong title',
      seasons: 2,
      network: 'wrong network',
    });

    const res = await request(app).delete(`/api/v1/shows/${show.id}`);

    expect(res.body).toEqual(show);
    expect(await Show.getShowById(show.id)).toBeNull();
  });
});
