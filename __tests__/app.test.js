const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


test('should create a table row', async () => {
  const expected = {
    name: 'flourite',
    crystal_system: 'isometric',
    hardness: '4',
  };
  const response = await request(app).post('/api/v1/rocks').send(expected);
  expect(response.body).toEqual({ id: expect.any(String), ...expected});
})

});