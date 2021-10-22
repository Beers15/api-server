'use strict';

const express = require('express');
const router = express.Router();
const { Book: books, Author: authors } = require('../models');
const Collection = require('../lib/Collection.js');

const modelMap = {
  books: new Collection(books),
  authors: new Collection(authors),
};

router.use('/:model', (req, res, next) => {
  const model = modelMap[req.params.model];
  
  if(!model) {
    next('Model type not supported');
  }

  req.model = model;
  console.log(req.model);
  next();
});

router.get('/:model', async (req, res, next) => {
  const model = req.model;
  let records = await model.get();
  res.send(records);
});

router.get('/:model/:id', async (req, res, next) => {
  const model = req.model;

  let record = await model.get(req.params.id);
  res.send(record);
});

router.post('/:model', async (req, res, next) => {
  const model = req.model;

  let newRecord = await model.create(req.body);
  res.status(201).send(newRecord);
});

router.put('/:model/:id', async (req, res, next) => {
  const model = req.model;

  let newRecord = await model.update(req.params.id, req.body);
  res.send(newRecord);
});

router.delete('/:model/:id', async (req, res, next) => {
  const model = req.model;
  let result = await model.delete(req.params.id);
  res.send(result);
});

module.exports = router;