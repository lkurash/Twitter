"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Twits extends Model {
    static associate(models) {
      Twits.hasMany(models.Favorite_twits, {
        as: "favorite_twits",
        foreignKey: "twitId",
      });
      Twits.belongsTo(models.User, { as: "user", foreignKey: "userId" });

      Twits.hasMany(models.Twits, {
        as: "retwits",
        foreignKey: "twitId",
      });

      Twits.belongsTo(models.User, {
        as: "twit_user",
        foreignKey: "twitUserId",
      });
      Twits.hasMany(models.Likes, { as: "likes", foreignKey: "twitId" });
      Twits.hasMany(models.Likes, { as: "likes_another_user", foreignKey: "twitId" });
      Twits.hasMany(models.Comments, { foreignKey: "id" });
    }
  }

  Twits.init(
    {
      text: DataTypes.STRING,
      img: {
        type: DataTypes.STRING,
      },
      userId: DataTypes.INTEGER,
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
