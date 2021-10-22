'use strict';

const logger = require('../src/middleware/logger.js');

describe('Testing the logging middleware', () => {
  let req = {method: 'GET', path: '/api/books'};
  let res = {};
  let next = jest.fn(); //a jest "spy"
  console.log = jest.fn();

  it('should be able to log a method', () => {
    // actually use our logger
    logger(req, res, next);

    expect(console.log).toHaveBeenCalledWith('GET /api/books');
    expect(next).toHaveBeenCalled();
  });

  it('Should throw an error when PATCH method is called', () => {
    req.method = 'PATCH';

    logger(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid request made');
  });
});