const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Band = require('../lib/models/Band');
const req = require('express/lib/request');

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

  it('should list all bands', async () => {
    await Band.insert({
      id: '1',
      name: 'Coheed and Cambria',
      genre: 'Prog rock',
      albums: 10,
    });

    const res = await request(app).get('/api/v1/bands');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'Coheed and Cambria',
        genre: 'Prog rock',
        albums: 10,
      },
    ]);
  });

  it('should get a band by the id', async () => {
    const band = await Band.insert({
      name: 'Nirvana',
      genre: 'Rock',
      albums: 3,
    });

    const res = await request(app).get(`/api/v1/bands/${band.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Nirvana',
      genre: 'Rock',
      albums: 3,
    });
  });
});
