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
          photo: "",
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
          photo: "",
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
           user_name: "Vive con Propósito",
           email: "vive@mail.ru",
           password: await bcrypt.hash("123", 5),
           birthdate: "27 Jun 1971",
           photo: "",
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
            user_name: "Conor McGregor",
            email: "conor@mail.ru",
            password: await bcrypt.hash("123", 5),
            birthdate: "14 Jul 1988",
            photo: "",
            background: "",
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
