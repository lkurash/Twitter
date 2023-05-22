'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Retwit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
