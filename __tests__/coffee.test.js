const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Coffee = require('../lib/models/Coffee');

describe('journal routes', () => {
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
});
