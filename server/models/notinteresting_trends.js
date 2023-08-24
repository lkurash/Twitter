'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotInteresting_trends extends Model {
    static associate(models) {
      NotInteresting_trends.hasMany(models.Trends, {
        as: "trend",
        foreignKey: "id",
      });
      NotInteresting_trends.hasMany(models.User, {
        as: "user",
        foreignKey: "id",
      });
    }
  }
  NotInteresting_trends.init({
    trendId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NotInteresting_trends',
  });
  return NotInteresting_trends;
};
