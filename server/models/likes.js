"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      Likes.belongsTo(models.User, { as: "user_like", foreignKey: "userId" });
      Likes.belongsTo(models.Tweets, { as: "tweet", foreignKey: "tweetId" });
    }
  }

  Likes.init(
    {
      like: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      tweetId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
