'use strict';

const Book = (sequelize, DataTypes) => sequelize.define('Book', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Book;