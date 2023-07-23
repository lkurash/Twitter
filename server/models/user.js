'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Likes);
      User.hasMany(models.Twits);
      User.hasMany(models.Favorite_twits);
      User.hasMany(models.Following);
      User.hasMany(models.Comments);
    }
  }

  User.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    web_site_url: DataTypes.STRING,
    about: DataTypes.STRING,
    photo: DataTypes.STRING,
    background: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
