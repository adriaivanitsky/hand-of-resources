const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');

describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should create a table row', async () => {
    const expected = {
      name: 'ocarina of time',
      system: 'N64',
    };
    const response = await request(app).post('/api/v1/games').send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });
});
