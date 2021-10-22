'use strict';

module.exports = function(req, res, next) {
  if(req.method === 'POST' || req.method === 'PUT') {
    if(req.path === '/api/books') {
      if(!req.body.title || !req.body.description) {
        console.log('Either the title or the description was not provided in request body');
        next('Either the title or the description was not provided in request body');
      }
    }
    else if(req.path === '/api/authors') {
      if(!req.body.name || !req.body.bio) {
        console.log('Either the name or the bio was not provided in request body');
        next('Either the name or the bio was not provided in request body');
      }
    }
    next();
  } else {
    next();
  }
};