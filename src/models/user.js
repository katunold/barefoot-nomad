import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.userId = bcrypt.hashSync(user.email, 8);
          user.password = bcrypt.hashSync(user.password, 8);
        },
      },
    },
  );

  return User;
};
