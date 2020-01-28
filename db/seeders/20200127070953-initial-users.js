'use strict';

const bcrypt = require('bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('User', [
      {
        id: 'super-admin-user',
        firstName: 'Denis',
        lastName: 'Kasole',
        email: 'kasole@gmail.com',
        role: 'super_admin',
        gender: 'm',
        strategy: 'local',
        verified: true,
        password: bcrypt.hashSync('1qaz2wsx', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'manager-1',
        firstName: 'Denis',
        lastName: 'Jjagwe',
        lineManagerId: 'super-admin-user',
        email: 'Jjagwe@gmail.com',
        role: 'manager',
        gender: 'm',
        strategy: 'local',
        verified: true,
        password: bcrypt.hashSync('1qaz2wsx', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'manager-2',
        firstName: 'Arnold',
        lastName: 'Katumba',
        lineManagerId: 'super-admin-user',
        email: 'katunold94@gmail.com',
        role: 'manager',
        gender: 'm',
        strategy: 'local',
        verified: true,
        password: bcrypt.hashSync('1qaz2wsx', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('User', null, {});
  },
};
