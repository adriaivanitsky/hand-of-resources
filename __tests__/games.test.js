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

  test('should read the table', async () => {
    const expected = [
      { id: '1', name: 'ocarina of time', system: 'N64' },

      { id: '2', name: 'breath of the wild', system: 'nintendo switch' },

      { id: '3', name: 'metroid', system: 'NES' },
    ];
    const response = await request(app).get('/api/v1/games');
    expect(response.body).toEqual(expected);
  });

  test('should find game by its id', async () => {
    const expected = {
      id: '1',
      name: 'ocarina of time',
      system: 'N64',
    };
    const response = await request(app).get('/api/v1/games/1');
    expect(response.body).toEqual(expected);
  });
});
