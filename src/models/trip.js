'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    start: DataTypes.STRING,
    stop: DataTypes.STRING,
    travelDate: DataTypes.DATE,
    travelReason: DataTypes.STRING,
    accommodation: DataTypes.STRING
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.User)
  };
  return Trip;
};
