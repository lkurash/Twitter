'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Topics.init({
    trend: DataTypes.STRING,
    title: DataTypes.STRING,
    count_twits: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topics',
  });
  return Topics;
};
