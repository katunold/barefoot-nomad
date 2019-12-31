'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      profilePic: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING(45)
      },
      lastName: {
        type: Sequelize.STRING(45)
      },
      email: {
        type: Sequelize.STRING(45)
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female']
      },
      birthDate: Sequelize.DATEONLY,
      residence: Sequelize.STRING(100),
      role: Sequelize.STRING(100),
      department: Sequelize.STRING(45),
      lineManager: Sequelize.STRING(45),
      preferredLanguage: Sequelize.STRING(45),
      preferredCurrency: Sequelize.STRING(45),
      strategy: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      password: {
        type: Sequelize.STRING(45)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
