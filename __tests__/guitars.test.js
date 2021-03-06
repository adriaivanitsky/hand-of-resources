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
    const response = await request(app).post('/api/v1/guitars').send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  test('should read the table', async () => {
    const expected = [
      { id: '1', name: 'gibson les paul', year: '1982' },
      {
        id: '2',
        name: 'fender mustang',
        year: '1974',
      },
      {
        id: '3',
        name: 'rickenbacker',
        year: '1974',
      },
    ];
    const response = await request(app).get('/api/v1/guitars');

    expect(response.body).toEqual(expected);
  });

  test('should find guitar by its id', async () => {
    const expected = {
      id: '1',
      name: 'gibson les paul',
      year: '1982',
    };
    const response = await request(app).get('/api/v1/guitars/1');
    expect(response.body).toEqual(expected);
  });

  test('should update specific row corresponding to its individual id', async () => {
    const expected = {
      id: '1',
      name: 'gibson les paul',
      year: '1982',
    };
    const response = await request(app)
      .patch('/api/v1/guitars/1')
      .send({ year: '1982' });
    expect(response.body).toEqual(expected);
  });

  test('should delete a guitar by its id', async () => {
    const expected = await Guitar.findById(1);
    const response = await request(app).delete(
      `/api/v1/guitars/${expected.id}`
    );
    expect(response.body).toEqual(expected);
  });
});
