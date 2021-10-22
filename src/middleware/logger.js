'use strict';

module.exports = function(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  
  let method = req.method;
  if(method === 'PATCH') {
    next('Invalid request made');
  } else {
    next();
  }
};