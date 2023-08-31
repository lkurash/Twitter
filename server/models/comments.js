"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.User, { as: "user", foreignKey: "userId" });
      Comments.belongsTo(models.Twits, {
        foreignKey: "twitId",
      });
    }
  }

  Comments.init(
    {
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      twitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
