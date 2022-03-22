const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

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

  it('should list all books in the db', async () => {
    await Book.insert({
      title: 'book book',
      author: 'author',
      page_count: 250,
    });

    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'book book',
        author: 'author',
        page_count: 250,
      },
    ]);
  });

  it('should get a book by the id', async () => {
    const book = await Book.insert({
      title: 'some book',
      author: 'some author',
      page_count: 100,
    });

    const res = await request(app).get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'some book',
      author: 'some author',
      page_count: 100,
    });
  });

  it('should update a book by the id', async () => {
    const book = await Book.insert({
      title: 'wrong title',
      author: 'wrong author',
      page_count: 100,
    });

    const res = await request(app).patch(`/api/v1/books/${book.id}`).send({
      id: '1',
      title: 'correct title',
      author: 'correct author',
      page_count: 100,
    });

    const expected = {
      id: expect.any(String),
      title: 'correct title',
      author: 'correct author',
      page_count: 100,
    };

    expect(res.body).toEqual(expected);
  });

  it('should delete a book by id', async () => {
    const data = {
      title: 'Chevy',
      author: 'Camero',
      page_count: 1990,
    };

    const book = await Book.insert(data);

    const res = await request(app).delete(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual(book);
    expect(await Book.getBookById(book.id)).toBeNull();
  });
});
