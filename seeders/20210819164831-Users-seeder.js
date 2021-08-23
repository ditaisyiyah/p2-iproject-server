'use strict';

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'example@mail.com',
        password: hashPassword('example'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'contoh@mail.com',
        password: hashPassword('contoh'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
