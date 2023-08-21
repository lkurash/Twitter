"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Topics extends Model {
    static associate(models) {
      // define association here
    }
  }

  Topics.init(
    {
      trend: DataTypes.STRING,
      title: DataTypes.STRING,
      count_twits: DataTypes.INTEGER,
      notinteresting_for_users: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Topics",
    }
  );
  return Topics;
};
