'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    start: DataTypes.STRING,
    stop: DataTypes.STRING,
    travelDate: DataTypes.DATE,
    travelReason: DataTypes.STRING,
    accommodation: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.User, {
      foreignKey: 'userId',
    })
  };
  return Trip;
};
