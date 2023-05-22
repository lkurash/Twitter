'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_twits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite_twits.belongsTo(models.User, {
        foreignKey: 'UserId',
      });
      Favorite_twits.belongsTo(models.Twits,{
        foreignKey: 'TwitId',
      });
    }
  }
  Favorite_twits.init({
    bookmark: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    TwitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite_twits',
  });
  return Favorite_twits;
};
