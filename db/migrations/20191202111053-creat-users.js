'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'User',
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        profilePic: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        birthDate: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        residence: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        role: {
          type: Sequelize.ENUM(
            'super_admin',
            'travel_admin',
            'travel_team_member',
            'manager',
            'supplier',
            'requester',
          ),
          defaultValue: 'requester',
        },
        department: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        lineManagerId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        preferredLanguage: Sequelize.STRING,
        preferredCurrency: Sequelize.STRING,
        strategy: {
          type: Sequelize.STRING,
        },
        verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        password: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
      },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  },
};
