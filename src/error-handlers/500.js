'use strict';

module.exports = function(err, req, res, next) {
  if(err !== '404/Not-Found') {
    res.status(500);
  } else {
    console.log(err);
  }
  (err === 'Invalid request made' || err === '404/Not-Found') ? res.status(404) : res.status(500);

  res.send(err);
};
