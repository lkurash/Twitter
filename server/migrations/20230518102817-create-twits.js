"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tweets", {
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
      userId: {
        type: Sequelize.INTEGER,
      },
      retweet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tweetId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      tweetUserId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      countRetweets: {
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
    await queryInterface.dropTable("Tweets");
  },
};
