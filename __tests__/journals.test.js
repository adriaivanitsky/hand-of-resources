const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Journal = require('../lib/models/Journal');

describe('journal routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should create a new table row', async () => {
    const expected = {
      name: 'moleskine',
      pages: 100,
    };
    const response = await request(app).post('/api/v1/journals').send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  test('should read the table', async () => {
    const expected = [
      { id: '1', name: 'moleskine', pages: 100 },
      {
        id: '2',
        name: 'leuchtturm',
        pages: 250,
      },
      {
        id: '3',
        name: 'hobonichi',
        pages: 300,
      },
    ];
    const response = await request(app).get('/api/v1/journals');

    expect(response.body).toEqual(expected);
  });

  test('should find journal by its id', async () => {
    const expected = {
      id: '1',
      name: 'moleskine',
      pages: 100,
    };
    const response = await request(app).get('/api/v1/journals/1');
    expect(response.body).toEqual(expected);
  });
});
