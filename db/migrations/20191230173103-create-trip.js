'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Trip',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.STRING,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        departure: {
          type: Sequelize.STRING,
        },
        destination: {
          type: Sequelize.STRING,
        },
        travelDate: {
          type: Sequelize.DATE,
        },
        travelReason: {
          type: Sequelize.STRING,
        },
        accommodation: {
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
    return queryInterface.dropTable('Trip');
  },
};
