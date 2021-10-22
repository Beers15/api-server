'use strict';

const Author = (sequelize, DataTypes) => sequelize.define('Author', {
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Author;