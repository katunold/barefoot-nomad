'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccommodationFacility = sequelize.define(
    'AccommodationFacility',
    {
      facilityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: 'Not provided',
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: 'Not provided',
      },
      numberOfRooms: DataTypes.INTEGER,
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {},
  );
  AccommodationFacility.associate = function(models) {
    // associations can be defined here
  };
  return AccommodationFacility;
};
