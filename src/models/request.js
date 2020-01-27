'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Request',
    {
      status: {
        type: DataTypes.ENUM(
          'sent',
          'received',
          'pending',
          'canceled',
          'granted',
        ),
        defaultValue: 'sent',
      },
      lineManagerId: DataTypes.INTEGER,
    },
    {},
  );
  Request.associate = function(models) {
    // associations can be defined here
    Request.belongsTo(models.User, {
      foreignKey: 'requesterId',
      targetKey: 'id',
    });
    Request.hasMany(models.Trip, { foreignKey: 'requestId' });
  };
  return Request;
};
