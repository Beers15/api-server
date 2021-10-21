'use strict';

const express = require('express');
const app = express(); 

app.use(express.json());

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log('server is up on ' + port));
  },
};