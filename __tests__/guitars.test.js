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

    test('should create a table row', async () => {
        const expected = {
            name: 'gibson les paul', 
            year: '1982',
        };
        const response = await (await request(app).post('/api/v1/guitars')).setEncoding(expected);
        expect(response.body).toEqual({ id: expect.any(String), ...expected });
    });