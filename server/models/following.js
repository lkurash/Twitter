'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Following.belongsTo(models.User, {as: "User",
        foreignKey: 'UserId',
      });
      Following.belongsTo(models.User, {
        as: "followUser", foreignKey: "followUserId"
      });
    }
  }
  Following.init({
    followUserId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Following',
  });
  return Following;
};
