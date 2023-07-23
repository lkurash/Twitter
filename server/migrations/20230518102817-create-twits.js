"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Twits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      retwit: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      twitId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      twitUserId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      countRetwits: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      countLikes: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      countComments: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Twits");
  },
};
