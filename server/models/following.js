'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Following extends Model {

    static associate(models) {
      Following.belongsTo(models.User, {as: "followings_users",
        foreignKey: 'id',
      });
      Following.belongsTo(models.User, {
        as: "followers_users", foreignKey: "followUserId"
      });
    }
  }

  Following.init({
    followUserId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Following',
  });
  return Following;
};
