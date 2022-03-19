const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Guitar = require('../lib/models/Guitar');

describe('guitar routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should create a new table row', async () => {
      const expected = {
          name: 'moleskine',
          pages: '100',
      };
      const response = await (await request(app).post('/api/v1/journals')).setEncoding(expected);
      expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });