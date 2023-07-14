'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {

    static associate(models) {
      Comments.belongsTo(models.User, {
        foreignKey: 'UserId',
      });
      Comments.belongsTo(models.Twits,{
        foreignKey: 'TwitId',
      });
    }
  }

  Comments.init({
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    TwitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
