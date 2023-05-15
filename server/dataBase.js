const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
  'Twitter',
  'postgres',
  'qweqweqwe',
  {
    dialect : 'postgres',
    host: 'localhost',
    port: 5432
  }
);
