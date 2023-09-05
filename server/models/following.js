"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    static associate(models) {
      Following.belongsTo(models.User, {
        as: "user",
        foreignKey: "followUserId",
      });
      Following.belongsTo(models.User, {
        as: "followUser",
        foreignKey: "userId",
      });
    }
  }

  Following.init(
    {
      followUserId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Following",
    }
  );
  return Following;
};
