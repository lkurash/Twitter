"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "So cute)",
          userId: 2,
          tweetId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "Nice)",
          userId: 4,
          tweetId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "Super!!",
          userId: 2,
          tweetId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "Hello!",
          userId: 1,
          tweetId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
