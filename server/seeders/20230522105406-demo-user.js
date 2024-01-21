"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "Cat",
          email: "cat@mail.ru",
          password: await bcrypt.hash("123", 5),
          birthdate: "12 August 2012",
          photo: "57d2b6e6-4bd9-41ba-ab92-b4aafa959921.jpg",
          background: "cd473c30-dfcf-4d37-b8c1-5adadb601478.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "Lisa",
          email: "lisa@mail.ru",
          password: await bcrypt.hash("123", 5),
          birthdate: "22 May 1997",
          photo: "e76f72e0-e0d3-4fcd-afec-0407388ac0bb.jpg",
          background: "2b996c09-d647-4716-af54-7336bbf76351.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "Kasper",
          email: "kasper@mail.ru",
          password: await bcrypt.hash("123", 5),
          birthdate: "20 April 2000",
          photo: "9403b904-f456-4d9f-bcbf-4383ced686cf.jpg",
          background: "f8f3f64f-f495-4658-b642-99fa929a4e46.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "Maye Musk",
          email: "mamamask@mail.ru",
          password: await bcrypt.hash("123", 5),
          birthdate: "19 Apr 1948",
          photo: "a6d3999b-480a-48dc-93ad-8e956d9593f1.jpg",
          background: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "Elon Musk",
          email: "mask@mail.ru",
          password: await bcrypt.hash("123", 5),
          birthdate: "28 Jun 1971",
          photo: "c5a38eef-e61d-475a-89ef-9abdc5805e83.jpg",
          background: "b986e08a-d09e-419a-8e2a-a94505ef09ee.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

     await queryInterface.bulkInsert(
       "Users",
       [
         {
           user_name: "Vive con Propósito",
           email: "vive@mail.ru",
           password: await bcrypt.hash("123", 5),
           birthdate: "27 Jun 1971",
           photo: "855d7593-fdea-4df7-afd7-c478268c7c16.jpg",
           background: "46d4282e-b110-42be-9cc4-ea7bb2ba103e.jpg",
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );

      await queryInterface.bulkInsert(
        "Users",
        [
          {
            user_name: "Conor McGregor",
            email: "conor@mail.ru",
            password: await bcrypt.hash("123", 5),
            birthdate: "14 Jul 1988",
            photo: "dab10f52-492c-4c6e-8631-5b24d34adb50.jpg",
            background: "83a474c6-528d-4ce3-8778-83e8746010ac.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
