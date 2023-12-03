"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Love",
          img: "16fd4d12-4d83-49c1-99d4-8c6f9abc57ad.jpg",
          userId: 2,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          retweet: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "You reap what you sow.",
          img: "",
          userId: 7,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Bali",
          img: "ca40c8df-dfae-4db1-b853-08cafd08cd92.jpg",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          retweet: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Hi, tweetter",
          img: "46031399-1115-4929-b916-807938c17b84.jpg",
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          retweet: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "I live in Minsk",
          img: "616bf6e6-9324-46cb-ab07-412286c5966b.jpg",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          retweet: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Relax and allow your dreams to manifest! ",
          img: "",
          userId: 7,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "My mouse",
          img: "cd473c30-dfcf-4d37-b8c1-5adadb601478.jpg",
          userId: 1,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Perdona a tu antiguo yo, has cambiado.",
          img: "",
          userId: 6,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Planning on doing a Friday night video game livestream every few weeks with live chat for my subscribers",
          img: "",
          userId: 5,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Minsk",
          img: "616bf6e6-9324-46cb-ab07-412286c5966b.jpg",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          retweet: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "A veces tienes que mantenerte ocupado para no tener tiempo para sentir.",
          img: "",
          userId: 6,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

     await queryInterface.bulkInsert(
       "Tweets",
       [
         {
           text: "Excited to give a talk today in Zhuhai.Even more excited to see the announcement on the beautiful Opera House.",
           img: "",
           userId: 4,
           retweet: false,
           countRetweets: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "“All your based are belong to us” – Cybertruck",
          img: "",
          userId: 5,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Actions speak louder than words",
          img: "",
          userId: 5,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Perdona a tu antiguo yo, has cambiado.",
          img: "",
          userId: 6,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tweets",
      [
        {
          text: "Grok punches above its weights",
          img: "",
          userId: 5,
          retweet: false,
          countRetweets: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tweets", null, {});
  },
};
