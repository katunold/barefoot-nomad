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

exports.userProfile = {
  "userId": "116000837208538146118",
  "profilePic": "https://lh3.googleusercontent.com/a-/AAuE7mATW8ztUMxpSiJ9sdQYdS4UZN_LNhwpydHLEqSUuQ=s50",
  "firstName": "Arnold",
  "lastName": "Katumba",
  "email": "katunold94@gmail.com",
  "gender": null,
  "birthDate": null,
  "residence": null,
  "role": null,
  "department": null,
  "lineManager": null,
  "preferredLanguage": null,
  "preferredCurrency": null,
  "createdAt": "2019-12-29T09:55:43.999Z",
  "updatedAt": "2019-12-29T09:55:43.999Z"
};

exports.profileUpdateData = {
  "gender": "m",
  "birthDate": "1994-10-25",
  "residence": "Kampala",
  "role": "Software Engineer",
  "department": "Partner Engineering",
  "lineManager": "Magero",
  "preferredLanguage": "English",
  "preferredCurrency": "usd"
};

exports.faultyProfileUpdateData = {
  "profilePic": "hhjghfngfcnvh.com",
  "gender": "m",
  "birthDate": "1994-10-25",
  "email": "testuser@gmail.com",
  "firstName": "Arnold",
  "role": "1yagva23 234y321"
};

exports.updateProfileResponse = [
  1,
  [
    {
      "userId": "116000837208538146118",
      "profilePic": "https://lh3.googleusercontent.com/a-/AAuE7mATW8ztUMxpSiJ9sdQYdS4UZN_LNhwpydHLEqSUuQ=s50",
      "firstName": "Arnold",
      "lastName": "Katumba",
      "email": "katunold94@gmail.com",
      "gender": "male",
      "birthDate": "1994-10-25",
      "residence": "Kampala",
      "role": "Software Engineer",
      "department": "Partner Engineering",
      "lineManager": "Mr. Magero",
      "preferredLanguage": "English",
      "preferredCurrency": "usd",
      "strategy": "google-plus",
      "verified": true,
      "password": null,
      "createdAt": "2019-12-29T18:16:38.553Z",
      "updatedAt": "2019-12-29T18:19:54.754Z"
    }
  ]
];

exports.oneWayTripRequestData = {
  "start": "Kampala",
  "stop": "Nairobi",
  "travelDate": "2020-01-04T05:52Z",
  "travelReason": "Business oriented",
  "accommodation": "Acadia suits"
};

exports.oneWayTripRequestDataWithPastDate = {
  "start": "Kampala",
  "stop": "Nairobi",
  "travelDate": "2019-01-04T05:52Z",
  "travelReason": "Business oriented",
  "accommodation": "Acadia suits"
};

exports.oneWayFaultyTripRequestData = {
  "travelDate": "2020-01-04T05:52Z",
  "travelReason": "Business oriented",
  "accommodation": "Acadia suits"
};

exports.oneWayTripResponse = {
  "id": 1,
  "UserId": "116000837208538146118",
  "start": "Kampala",
  "stop": "Nairobi",
  "travelDate": "2020-01-04T05:52:00.000Z",
  "travelReason": "Business oriented",
  "accommodation": "Acadia suits",
  "updatedAt": "2020-01-02T08:55:01.731Z",
  "createdAt": "2020-01-02T08:55:01.731Z"
};
