const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Coffee = require('../lib/models/Coffee');

describe('coffee routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should create new table row', async () => {
    const expected = {
      name: 'stumptown',
      roast: 'light',
    };
    const response = await request(app).post('/api/v1/coffees').send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  test('should read the table', async () => {
    const expected = [
      { id: '1', name: 'stumptown', roast: 'light' },
      {
        id: '2',
        name: 'coava',
        roast: 'medium',
      },
      {
        id: '3',
        name: 'portland coffee roasters',
        roast: 'dark',
      },
    ];
    const response = await request(app).get('/api/v1/coffees');
    expect(response.body).toEqual(expected);
  });

  test('should find coffee by its id', async () => {
    const expected = {
      id: '1',
      name: 'stumptown',
      roast: 'light',
    };
    const response = await request(app).get('/api/v1/coffees/1');
    expect(response.body).toEqual(expected);
  });
});
