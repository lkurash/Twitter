"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Twits extends Model {
    static associate(models) {
      Twits.hasMany(models.Favorite_twits);
      Twits.belongsTo(models.User, { as: "user", foreignKey: "UserId" });
      Twits.belongsTo(models.Twits, { as: "originalTwit", foreignKey: "twitId" });
      Twits.belongsTo(models.User, {
        as: "twitUser",
        foreignKey: "twitUserId",
      });
      Twits.hasMany(models.Likes);
      Twits.hasMany(models.Comments);
    }
  }

  Twits.init(
    {
      text: DataTypes.STRING,
      img: {
        type: DataTypes.STRING,
      },
      UserId: DataTypes.INTEGER,
      retwit: {
        type: Boolean,
        defaultValue: false,
      },
      twitId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      twitUserId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      countRetwits: {
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
      modelName: "Twits",
    }
  );
  return Twits;
};
