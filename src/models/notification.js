'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      message: DataTypes.STRING,
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.NotificationPreference, {
      foreignKey: 'notificationPreferenceId',
      targetKey: 'id',
    });
  };
  return Notification;
};
