'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { sequelizaDatabase } = require('../src/models/indexedDB.js');
const request = supertest(app);

beforeAll(async () => {
  await sequelizaDatabase.sync();
});

afterAll(async () => {
  await sequelizaDatabase.drop();
});

describe('REST API', () => {
  test('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });

  test('Create a customer', async () => {
    let response = await request.post('/customer').send({
      name: 'tester',
      age: 42,
      pronouns: 'they/them',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('they/them');
  });

  test('finds all customers', async () => {
    let response = await request.get('/customer');

    expect(response[0].status).toEqual(200);
    expect(response[0].body.name).toEqual('tester');
    expect(response[0].body.age).toEqual(42);
    expect(response[0].body.pronouns).toEqual('they/them');
  });
});
