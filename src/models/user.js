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
      firstName: DataTypes.STRING(45),
      lastName: DataTypes.STRING(45),
      email: DataTypes.STRING(45),
      gender: {
        type: DataTypes.STRING(10),
      },
      birthDate: DataTypes.DATEONLY,
      residence: DataTypes.STRING(100),
      role: DataTypes.STRING(100),
      department: DataTypes.STRING,
      lineManager: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING(45),
      preferredCurrency: DataTypes.STRING(45),
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
