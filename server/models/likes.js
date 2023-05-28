'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {

    static associate(models) {
      Likes.belongsTo(models.User, {
        foreignKey: 'UserId',
      });
      Likes.belongsTo(models.Twits,{
        foreignKey: 'TwitId',
      });
    }
  }

  Likes.init({
    like: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    TwitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};
