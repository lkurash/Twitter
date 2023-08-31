"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite_twits extends Model {
    static associate(models) {
      Favorite_twits.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
      Favorite_twits.belongsTo(models.Twits, {
        as: "favorite_twits",
        foreignKey: "twitId",
      });
    }
  }

  Favorite_twits.init(
    {
      bookmark: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      twitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorite_twits",
    }
  );
  return Favorite_twits;
};
