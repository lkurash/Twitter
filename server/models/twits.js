"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tweets extends Model {
    static associate(models) {
      Tweets.hasMany(models.Favorite_tweets, {
        as: "favorite_tweets",
        foreignKey: "tweetId",
      });
      Tweets.belongsTo(models.User, { as: "user", foreignKey: "userId" });

      Tweets.hasMany(models.Tweets, {
        as: "retweets",
        foreignKey: "tweetId",
      });

      Tweets.belongsTo(models.User, {
        as: "tweet_user",
        foreignKey: "tweetUserId",
      });
      Tweets.hasMany(models.Likes, { as: "likes", foreignKey: "tweetId" });
      Tweets.hasMany(models.Likes, {
        as: "likes_another_user",
        foreignKey: "tweetId",
      });
      Tweets.hasMany(models.Comments, { foreignKey: "id" });
    }
  }

  Tweets.init(
    {
      text: DataTypes.STRING,
      img: {
        type: DataTypes.STRING,
      },
      userId: DataTypes.INTEGER,
      retweet: {
        type: Boolean,
        defaultValue: false,
      },
      tweetId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      tweetUserId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      countRetweets: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      countLikes: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      countComments: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Tweets",
    }
  );
  return Tweets;
};
