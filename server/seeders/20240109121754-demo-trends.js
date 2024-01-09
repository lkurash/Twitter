"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Trends",
      [
        {
          title: "Friday",
          trend: "Trend all over the world",
          count_tweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Trends",
      [
        {
          title: "Cybertruck",
          trend: "Trend all over the world",
          count_tweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Trends",
      [
        {
          title: "cambiado",
          trend: "Trend all over the world",
          count_tweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

     await queryInterface.bulkInsert(
       "Trends",
       [
         {
           title: "Excited",
           trend: "Trend all over the world",
           count_tweets: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );

     await queryInterface.bulkInsert(
       "Trends",
       [
         {
           title: "weights",
           trend: "Trend all over the world",
           count_tweets: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );

      await queryInterface.bulkInsert(
        "Trends",
        [
          {
            title: "Opera",
            trend: "Trend all over the world",
            count_tweets: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Trends", null, {});
  },
};
