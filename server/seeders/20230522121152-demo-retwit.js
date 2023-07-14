'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Retwits', [{
      retwit: true,
      UserId: 1,
      TwitId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Retwits', [{
      retwit: true,
      UserId: 3,
      TwitId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Retwits', [{
      retwit: true,
      UserId: 4,
      TwitId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Retwits', [{
      retwit: true,
      UserId: 3,
      TwitId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Retwits', null, {});
  }
};
