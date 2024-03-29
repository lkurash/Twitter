"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Likes, { as: "user_like", foreignKey: "userId" });
      User.hasMany(models.Tweets, { foreignKey: "id" });
      User.hasMany(models.Favorite_tweets, {
        as: "user_favorite_tweets",
        foreignKey: "userId",
      });
      User.hasMany(models.Following, {
        as: "followings_user",
        foreignKey: "followUserId",
      });
      User.hasMany(models.Following, {
        as: "followers_user",
        foreignKey: "userId",
      });
      User.hasMany(models.Comments, { foreignKey: "id" });
    }
  }

  User.init(
    {
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthdate: DataTypes.STRING,
      web_site_url: DataTypes.STRING,
      about: DataTypes.STRING,
      photo: DataTypes.STRING,
      background: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
