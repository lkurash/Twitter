'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Twits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Twits.hasMany(models.Favorite_twits);
      Twits.belongsTo(models.User, { foreignKey: "UserId" });
      Twits.hasMany(models.Likes);
      Twits.hasMany(models.Comments);
      Twits.hasMany(models.Retwit);
    }
  }
  Twits.init({
    text: DataTypes.STRING,
    img: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Twits',
  });
  return Twits;
};
