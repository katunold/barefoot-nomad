'use strict';

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
    return queryInterface.bulkInsert('NotificationPreferences', [
      {
        isInAppNotification: true,
        isEmailNotification: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'super-admin-user',
      },
      {
        isInAppNotification: true,
        isEmailNotification: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'manager-1',
      },
      {
        isInAppNotification: false,
        isEmailNotification: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'manager-2',
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
  },
};
