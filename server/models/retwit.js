'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Retwit extends Model {

    static associate(models) {
      Retwit.belongsTo(models.User, {
        foreignKey: 'UserId',
      });
      Retwit.belongsTo(models.Twits,{
        foreignKey: 'TwitId',
      });
    }
  }

  Retwit.init({
    retwit: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    TwitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Retwit',
  });
  return Retwit;
};
