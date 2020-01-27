'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    'Trip',
    {
      departure: DataTypes.STRING,
      destination: DataTypes.STRING,
      tripType: DataTypes.STRING,
      departureDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      travelReason: DataTypes.STRING,
      accommodationId: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    },
  );
  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });

    Trip.belongsTo(models.Request, {
      foreignKey: 'requestId',
      targetKey: 'id',
    });
  };
  return Trip;
};
