const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

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

  it('should list all cars', async () => {
    await Car.create({
      year: 1984,
      make: 'Honda',
      model: 'Accord',
    });

    const res = await request(app).get('/api/v1/cars');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        year: 1984,
        make: 'Honda',
        model: 'Accord',
      },
    ]);
  });

  it('should get a car by Id', async () => {
    const car = await Car.create({
      year: 2017,
      make: 'Jeep',
      model: 'Wrangler',
    });

    const res = await request(app).get(`/api/v1/cars/${car.id}`);

    expect(res.body).toEqual(car);
  });

  it('should delete a car by id', async () => {
    const car = await Car.create({
      year: 1990,
      make: 'Chevy',
      model: 'Camero',
    });

    const res = await request(app).delete(`/api/v1/cars/${car.id}`);

    expect(res.body).toEqual(car);
    expect(await Car.getCarById(car.id)).toBeNull();
  });

  it('should update a car by Id', async () => {
    const car = await Car.create({
      year: 2022,
      make: 'Toyota',
      model: 'Supra',
    });

    const res = await request(app).patch(`/api/v1/cars/${car.id}`).send({
      year: 2020,
    });

    const expected = {
      id: expect.any(String),
      year: 2020,
      make: 'Toyota',
      model: 'Supra',
    };

    expect(res.body).toEqual(expected);
  });
});
