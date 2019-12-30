'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      userId: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      profilePic: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING,
      },
      birthDate: Sequelize.DATEONLY,
      residence: Sequelize.STRING,
      role: Sequelize.STRING,
      department: Sequelize.STRING,
      lineManager: Sequelize.STRING,
      preferredLanguage: Sequelize.STRING,
      preferredCurrency: Sequelize.STRING,
      strategy: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
      {
      freezeTableName: true
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  }
};
