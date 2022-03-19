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
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });

  test('should read the table', async () => {
    const expected = [
      { id: '1', name: 'pyrite', crystal_system: 'cubic', hardness: '6' },
      {
        id: '2',
        name: 'labradorite',
        crystal_system: 'triclinic',
        hardness: '6',
      },
      { id: '3', name: 'amethyst', crystal_system: 'trigonal', hardness: '7' },
    ];
    const response = await request(app).get('/api/v1/rocks');

    expect(response.body).toEqual(expected);
  });

  test('should find rock by its id', async () => {
    const expected = {
      id: '3',
      name: 'amethyst',
      crystal_system: 'trigonal',
      hardness: '7',
    };
    const response = await request(app).get('/api/v1/rocks/3');
    expect(response.body).toEqual(expected);
  });

  test('should update specific row corresponding to its individual id', async () => {
    const expected = {
      id: '3',
      name: 'amethyst',
      crystal_system: 'trigonal',
      hardness: '6',
    };
    const response = await request(app)
      .patch('/api/v1/rocks/3')
      .send({ hardness: '6' });
    expect(response.body).toEqual(expected);
  });

  test('should delete a rock by its id', async () => {
    const expected = await Rock.findById(1);
    const response = await request(app).delete(`/api/v1/rocks/${expected.id}`);
    expect(response.body).toEqual(expected);
  });
});
