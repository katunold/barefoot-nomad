import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      profilePic: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
      },
      birthDate: DataTypes.DATEONLY,
      residence: DataTypes.STRING,
      role: DataTypes.STRING,
      department: DataTypes.STRING,
      lineManager: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      strategy: DataTypes.STRING,
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user) => {
          if (user.strategy === 'local') {
            user.userId = bcrypt.hashSync(user.email, 8);
            user.password = bcrypt.hashSync(user.password, 8);
            return;
          }
          user.userId = user.socialId;
        },
      },
    },
    {
      freezeTableName: true
    }
  );

  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
