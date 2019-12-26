exports.registerData = {
  firstName: 'arnold',
  lastName: 'katumba',
  email: 'katunold@gmail.com',
  password: '1qaz2wsx',
};

exports.userData = {
  userId: '$2b$08$0oZbNA/m9/m9drdYO3nnuONTD4AwgudRbixnGqWsw4OPvr1sNoLG.',
  firstName: 'Arnold',
  lastName: 'Katumba',
  email: 'katunold94@gmail.com',
  verified: false,
  password: '$2b$08$dqDFbSOjRoVF31pABrQ2uuheGNOV1whxzei8xGflWce4xDLrTmeu.',
  createdAt: '2019-12-12T07:36:42.303Z',
  updatedAt: '2019-12-12T07:37:07.911Z',
};

exports.verifyAccountResponse = [
  1,
  [
    {
      dataValues: {
        userId: '$2b$08$ZuiOIA7uBCq6UkIYeNsRtOtGPDheoOTLTg76c43KkYszPiMu5KN7a',
        firstName: 'Arnold',
        lastName: 'Katumba',
        email: 'katunold94@gmail.com',
        verified: true,
        password:
          '$2b$08$oNfUwA9L7kyrZQTaxFnVG.cVv5/QeB7.I8CPFRkwHQK6lJRdO/IWe',
        createdAt: '2019-12-12T07:08:03.254Z',
        updatedAt: '2019-12-12T07:08:18.333Z',
      },
    },
  ],
];

exports.registerWithMissingFields = {
  email: 'katumba@mail.com',
  password: '1qaz2wsx',
};

exports.loginData = {
  email: 'katumba@gmail.com',
  password: '1qaz2wsx',
};

exports.faultyLoginData = {
  email: 'katumba@gmail',
  password: '1qaz2wsx',
};

exports.userDataResponseOnLogin = {
  userId: '$2b$08$0oZbNA/m9/m9drdYO3nnuONTD4AwgudRbixnGqWsw4OPvr1sNoLG.',
  firstName: 'Arnold',
  lastName: 'Katumba',
  email: 'katunold94@gmail.com',
  verified: true,
  dataValues: {
    password: '$2b$08$dqDFbSOjRoVF31pABrQ2uuheGNOV1whxzei8xGflWce4xDLrTmeu.',
  },
  validatePassword: () => true
};

exports.userDataResponseOnLoginNotVerified = {
  userId: '$2b$08$0oZbNA/m9/m9drdYO3nnuONTD4AwgudRbixnGqWsw4OPvr1sNoLG.',
  firstName: 'Arnold',
  lastName: 'Katumba',
  email: 'katunold94@gmail.com',
  verified: false,
  dataValues: {
    password: '$2b$08$dqDFbSOjRoVF31pABrQ2uuheGNOV1whxzei8xGflWce4xDLrTmeu.',
  },
  validatePassword: () => true
};

exports.validatePasswordFalse = {
  userId: '$2b$08$0oZbNA/m9/m9drdYO3nnuONTD4AwgudRbixnGqWsw4OPvr1sNoLG.',
  firstName: 'Arnold',
  lastName: 'Katumba',
  email: 'katunold94@gmail.com',
  verified: true,
  dataValues: {
    password: '$2b$08$dqDFbSOjRoVF31pABrQ2uuheGNOV1whxzei8xGflWce4xDLrTmeu.',
  },
  validatePassword: () => false
};

exports.resetPasswordData = {
  email: 'testclient@gmail.com'
};

exports.faultyResetPasswordData = {
  email: 'testclient@gmail'
};
