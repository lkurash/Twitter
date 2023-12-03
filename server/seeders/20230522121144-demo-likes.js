"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 2,
          tweetId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 5,
          tweetId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 3,
          tweetId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 4,
          tweetId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 2,
          tweetId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 2,
          tweetId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 3,
          tweetId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 5,
          tweetId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 6,
          tweetId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 4,
          tweetId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 7,
          tweetId: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 2,
          tweetId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 3,
          tweetId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 4,
          tweetId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 5,
          tweetId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 6,
          tweetId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 7,
          tweetId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 2,
          tweetId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 3,
          tweetId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 4,
          tweetId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 5,
          tweetId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 6,
          tweetId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 7,
          tweetId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 2,
          tweetId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 3,
          tweetId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 4,
          tweetId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 1,
          tweetId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 2,
          tweetId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 3,
          tweetId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 4,
          tweetId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 5,
          tweetId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          like: true,
          userId: 4,
          tweetId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Likes", null, {});
  },
};
