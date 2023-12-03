"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite_tweets extends Model {
    static associate(models) {
      Favorite_tweets.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
      Favorite_tweets.belongsTo(models.Tweets, {
        as: "favorite_tweets",
        foreignKey: "tweetId",
      });
    }
  }

  Favorite_tweets.init(
    {
      bookmark: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      tweetId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorite_tweets",
    }
  );
  return Favorite_tweets;
};
