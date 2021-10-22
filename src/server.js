'use strict';

const express = require('express');
const app = express(); 

const apiRouter = require('./routes/api');

app.use(express.json());


app.use('/api', apiRouter);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('server is up on ' + port));
  },
};