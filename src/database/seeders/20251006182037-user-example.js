'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);
    
    return queryInterface.bulkInsert('users', [
      {
        nombre: 'David Alvarez',
        rut: '12.345.678-9',
        contraseña: bcrypt.hashSync('123456', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Claudio Sonnet',
        rut: '98.765.432-1',
        contraseña: bcrypt.hashSync('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
     return await queryInterface.bulkDelete('users', null, {});
  }
};
