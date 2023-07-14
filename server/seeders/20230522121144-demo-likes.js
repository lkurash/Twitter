'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 1,
      TwitId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 1,
      TwitId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 2,
      TwitId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 5,
      TwitId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 3,
      TwitId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 4,
      TwitId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 1,
      TwitId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 1,
      TwitId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Likes', [{
      like: true,
      UserId: 2,
      TwitId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
  }
};
