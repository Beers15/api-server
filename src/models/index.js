'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const BookModel = require('./book.js');
const AuthorModel = require('./author.js');

console.log(process.env.NODE_ENV);

let DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const options = process.env.NODE_ENV === 'production' 
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  } : {};

const sequelizeInstance = new Sequelize(DATABASE_URL, options);

const books = BookModel(sequelizeInstance, DataTypes);
const authors = AuthorModel(sequelizeInstance, DataTypes);

// authors.hasMany(books, { foreignKey: 'authorId', sourceKey: 'id'});
// books.belongsTo(authors, { foreignKey: 'authorId', targetKey: 'id'});

module.exports = {
  db: sequelizeInstance,
  Book: books,
  Author: authors,
};
