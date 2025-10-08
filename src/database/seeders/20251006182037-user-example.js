'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'David',
        lastName: 'Alvarez',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Claudio',
        lastName: 'Sonnet',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
     return await queryInterface.bulkDelete('users', null, {});
  }
};
