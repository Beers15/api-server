'use strict';

const express = require('express');
const app = express(); 

const apiRouter = require('./routes/api');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const _404 = require('./error-handlers/404'); 
const _500 = require('./error-handlers/500'); 

app.use(express.json());

app.use(logger);
app.use(validator);
app.use(_404);
app.use('/api', apiRouter);


app.use(_500);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('server is up on ' + port));
  },
};