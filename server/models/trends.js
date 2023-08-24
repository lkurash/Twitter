"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Trends extends Model {
    static associate(models) {
      Trends.hasMany(models.NotInteresting_trends, {
        as: "notInteresting_trends",
        foreignKey: "trendId",
      });
    }
  }

  Trends.init(
    {
      trend: DataTypes.STRING,
      title: DataTypes.STRING,
      count_twits: DataTypes.INTEGER,
      notinteresting_for_users: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trends",
    }
  );
  return Trends;
};
