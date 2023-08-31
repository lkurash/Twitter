"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      Likes.belongsTo(models.User, { as: "user_like", foreignKey: "userId" });
      Likes.belongsTo(models.Twits, { as: "likes", foreignKey: "twitId" });
    }
  }

  Likes.init(
    {
      like: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      twitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
