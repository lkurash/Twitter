"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.User, { as: "user", foreignKey: "userId" });
      Comments.belongsTo(models.Tweets, {
        foreignKey: "tweetId",
      });
    }
  }

  Comments.init(
    {
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tweetId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
