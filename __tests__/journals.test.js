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
});
