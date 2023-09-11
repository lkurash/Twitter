"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Twits",
      [
        {
          text: "Minsk",
          img: "616bf6e6-9324-46cb-ab07-412286c5966b.jpg",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          retwit: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Twits",
      [
        {
          text: "Love",
          img: "16fd4d12-4d83-49c1-99d4-8c6f9abc57ad.jpg",
          userId: 2,
          countRetwits: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          retwit: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Twits",
      [
        {
          text: "Bali",
          img: "ca40c8df-dfae-4db1-b853-08cafd08cd92.jpg",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          retwit: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Twits",
      [
        {
          text: "Hi, twitter",
          img: "46031399-1115-4929-b916-807938c17b84.jpg",
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          retwit: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Twits",
      [
        {
          text: "I live in Minsk",
          img: "616bf6e6-9324-46cb-ab07-412286c5966b.jpg",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          retwit: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Twits",
      [
        {
          text: "My mouse",
          img: "cd473c30-dfcf-4d37-b8c1-5adadb601478.jpg",
          userId: 1,
          retwit: false,
          countRetwits: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Twits",
      [
        {
          text: "Love",
          img: "16fd4d12-4d83-49c1-99d4-8c6f9abc57ad.jpg",
          twitUserId: 2,
          userId: 1,
          retwit: true,
          twitId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

     await queryInterface.bulkInsert(
       "Twits",
       [
         {
           text: "My mouse",
           img: "cd473c30-dfcf-4d37-b8c1-5adadb601478.jpg",
           twitUserId: 1,
           userId: 2,
           twitId: 6,
           retwit: true,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Twits", null, {});
  },
};
