'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationPreference = sequelize.define(
    'NotificationPreference',
    {
      isInAppNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isEmailNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  NotificationPreference.associate = function(models) {
    // associations can be defined here
    NotificationPreference.hasMany(models.Notification, {
      foreignKey: 'notificationPreferenceId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    NotificationPreference.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return NotificationPreference;
};
