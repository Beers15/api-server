'use strict';

const app = require('../src/server.js');
const supertest = require('supertest');
const { db } = require('../src/models/');
const { it } = require('@jest/globals');
const { response } = require('express');
const request = supertest(app.app);

// Initialize any things that our tests need
beforeAll(async () => {
  await db.drop();
  // make sure that my tables exist.
  await db.sync(); // creates our tables if they do not exist
});

// remove any side effects from our test
afterAll(async () => {
  // drops all table rows within our database instance.  After all tests 
  await db.drop();
});

//since all the Sequelize models use the same collection interface, only routes with a single model
describe('Testing the express server', () => {
  it('Should add a record to the database', async () => {
    const body = {'title': 'The Encyclopedia', 'description': 'Volume A'};
    const response = await request.post('/api/books').send(body).set('Content-type', 'application/json');

    expect(response.statusCode).toBe(201);
  });

  it('Should get all the records in the database', async () => {
    const body = {'title': 'filler title', 'description': 'filler description'};
    const body2 = {'title': 'filler title2', 'description': 'filler description2'};
    const body3 = {'title': 'filler title3', 'description': 'filler description3'};
    await request.post('/api/books').send(body).set('Content-type', 'application/json');
    await request.post('/api/books').send(body2).set('Content-type', 'application/json');
    await request.post('/api/books').send(body3).set('Content-type', 'application/json');
    
    const response = await request.get('/api/books');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(4);
  });

  it('Should retrieve a specific record from the database', async () => {
    let response = await request.get('/api/books/1');
    expect(response.statusCode).toBe(200);

    response = JSON.parse(response.res.text);

    expect(response.id).toBe(1);
    expect(response.title).toBe('The Encyclopedia');
    expect(response.description).toBe('Volume A');
  });

  it('Should update a specific record in the database', async () => {
    let response = await request.get('/api/books/1');
    expect(response.statusCode).toBe(200);

    response = JSON.parse(response.res.text);
    
    expect(response.id).toBe(1);
    expect(response.title).toBe('The Encyclopedia');
    expect(response.description).toBe('Volume A');

    const body = {'title': 'The Encyclopedia', 'description': 'Volume B'};
    
    await request.put('/api/books/1').send(body).set('Content-type', 'application/json');
    let updatedResponse = await request.get('/api/books/1');
    expect(updatedResponse.statusCode).toBe(200);
    
    updatedResponse = JSON.parse(updatedResponse.res.text);

    expect(updatedResponse.id).toBe(1);
    expect(updatedResponse.title).toBe('The Encyclopedia');
    expect(updatedResponse.description).toBe('Volume B');
  });

  it('Should delete a specific record from the database', async () => {
    await request.delete('/api/books/1');
    let updatedResponse = await request.get('/api/books/1');
    expect(updatedResponse.statusCode).toBe(200);
  });

  it('Should send a 404 when a bad route is used', async () => {
    const response = await request.get('/asdf');
    expect(response.status).toBe(404);
  });

  it('Should send a 404 when a bad method is used', async () => {
    const response = await request.patch('/api/books');
    expect(response.status).toBe(404);
  });
});