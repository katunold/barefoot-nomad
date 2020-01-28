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
  role: 'requester',
  dataValues: {
    password: '$2b$08$dqDFbSOjRoVF31pABrQ2uuheGNOV1whxzei8xGflWce4xDLrTmeu.',
  },
  validatePassword: () => true,
};

exports.superAdminDataResponseLogin = {
  userId: '$2b$08$0oZbNA/m9/m9drdYO3nnuONTD4AwgudRbixnGqWsw4OPvr1sNoLG.',
  firstName: 'Arnold',
  lastName: 'Katumba',
  email: 'katunold94@gmail.com',
  verified: true,
  role: 'super_admin',
  dataValues: {
    password: '$2b$08$dqDFbSOjRoVF31pABrQ2uuheGNOV1whxzei8xGflWce4xDLrTmeu.',
  },
  validatePassword: () => true,
};

exports.supplierDataResponseOnLogin = {
  userId: '$2b$08$0oZbNA/m9/m9drdYO3nnuONTD4AwgudRbixnGqWsw4OPvr1sNoLG.',
  firstName: 'Arnold',
  lastName: 'Katumba',
  email: 'katunold94@gmail.com',
  verified: true,
  role: 'supplier',
  dataValues: {
    password: '$2b$08$dqDFbSOjRoVF31pABrQ2uuheGNOV1whxzei8xGflWce4xDLrTmeu.',
  },
  validatePassword: () => true,
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
  validatePassword: () => true,
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
  validatePassword: () => false,
};

exports.resetPasswordData = {
  email: 'testclient@gmail.com',
};

exports.faultyResetPasswordData = {
  email: 'testclient@gmail',
};

exports.userProfile = {
  userId: '116000837208538146118',
  profilePic:
    'https://lh3.googleusercontent.com/a-/AAuE7mATW8ztUMxpSiJ9sdQYdS4UZN_LNhwpydHLEqSUuQ=s50',
  firstName: 'Arnold',
  lastName: 'Katumba',
  email: 'katunold94@gmail.com',
  gender: null,
  birthDate: null,
  residence: null,
  role: null,
  department: null,
  lineManager: null,
  preferredLanguage: null,
  preferredCurrency: null,
  createdAt: '2019-12-29T09:55:43.999Z',
  updatedAt: '2019-12-29T09:55:43.999Z',
};

exports.profileUpdateData = {
  gender: 'm',
  birthDate: '1994-10-25',
  residence: 'Kampala',
  role: 'Software Engineer',
  department: 'Partner Engineering',
  lineManager: 'Magero',
  preferredLanguage: 'English',
  preferredCurrency: 'usd',
};

exports.faultyProfileUpdateData = {
  profilePic: 'hhjghfngfcnvh.com',
  gender: 'm',
  birthDate: '1994-10-25',
  email: 'testuser@gmail.com',
  firstName: 'Arnold',
  role: '1yagva23 234y321',
};

exports.updateProfileResponse = [
  1,
  [
    {
      userId: '116000837208538146118',
      profilePic:
        'https://lh3.googleusercontent.com/a-/AAuE7mATW8ztUMxpSiJ9sdQYdS4UZN_LNhwpydHLEqSUuQ=s50',
      firstName: 'Arnold',
      lastName: 'Katumba',
      email: 'katunold94@gmail.com',
      gender: 'male',
      birthDate: '1994-10-25',
      residence: 'Kampala',
      role: 'Software Engineer',
      department: 'Partner Engineering',
      lineManager: 'Mr. Magero',
      preferredLanguage: 'English',
      preferredCurrency: 'usd',
      strategy: 'google-plus',
      verified: true,
      password: null,
      createdAt: '2019-12-29T18:16:38.553Z',
      updatedAt: '2019-12-29T18:19:54.754Z',
    },
  ],
];

exports.oneWayTripRequestData = {
  departure: 'Kampala',
  destination: 'Nairobi',
  departureDate: '2030-01-04T05:52Z',
  travelReason: 'Business oriented',
  accommodationId: 'Acadia suits',
};

exports.returnTripRequestData = {
  departure: 'Kampala',
  destination: 'Nairobi',
  departureDate: '2030-01-04T05:52Z',
  returnDate: '2030-01-05T05:52Z',
  travelReason: 'Business oriented',
  accommodationId: 'Acadia suits',
};

exports.returnTripWrongReturnDate = {
  departure: 'Kampala',
  destination: 'Nairobi',
  departureDate: '2030-01-05T05:52Z',
  returnDate: '2030-01-04T05:52Z',
  travelReason: 'Business oriented',
  accommodationId: 'Acadia suits',
};

exports.oneWayTripRequestDataWithPastDate = {
  departure: 'Kampala',
  destination: 'Nairobi',
  departureDate: '2020-01-04T05:52Z',
  travelReason: 'Business oriented',
  accommodationId: 'Acadia suits',
};

exports.oneWayFaultyTripRequestData = {
  departure: 'Kampala',
  destination: 'Nairobi',
  travelDate: '2020-01-04T05:52Z',
  travelReason: 'Business oriented',
  accommodation: 'Acadia suits',
};

exports.oneWayTripResponse = {
  id: 1,
  userId: '116000837208538146118',
  tripType: 'one_way',
  departureDate: '2020-01-25T05:52:00.000Z',
  travelReason: 'Business oriented',
  accommodationId: 'Acadia suits',
  updatedAt: '2020-01-22T07:44:23.502Z',
  createdAt: '2020-01-22T07:44:23.502Z',
  returnDate: null,
};

exports.returnTripResponse = {
  id: 2,
  userId: '116000837208538146118',
  tripType: 'return-trip',
  departureDate: '2020-01-25T05:52:00.000Z',
  returnDate: '2020-01-30T05:52:00.000Z',
  travelReason: 'Business oriented',
  accommodationId: 'Acadia suits',
  updatedAt: '2020-01-22T11:08:20.092Z',
  createdAt: '2020-01-22T11:08:20.092Z',
};

exports.createAccommodationFacilityResponse = {
  message: 'Accommodation facility has been added successfully',
  response: {
    description: 'Not provided',
    address: 'Not provided',
    available: true,
    id: 1,
    facilityName: 'Acadia suites',
    locationId: 10,
    numberOfRooms: 50,
    updatedAt: '2020-01-24T06:53:19.340Z',
    createdAt: '2020-01-24T06:53:19.340Z',
  },
};

exports.createAccommodationFacility = {
  facilityName: 'Acadia suites',
  locationId: 10,
  numberOfRooms: 50,
};

exports.createAccommodationFacilityFaulty = {
  locationId: 10,
  numberOfRooms: 50,
};

exports.cloudinaryProfilePicResponse = {
  public_id: 'xp7rpmprtzgc8mq5px8e',
  version: 1573108169,
  signature: 'fb45af8704d36f39ab7f0c52027d0f6bc9523e25',
  width: 3264,
  height: 2448,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2019-11-07T06:29:29Z',
  tags: [],
  bytes: 272302,
  type: 'upload',
  etag: '25111849f179fe82ecf99bccd7b5932d',
  placeholder: false,
  url:
    'http://res.cloudinary.com/katunold/image/upload/v1573108169/xp7rpmprtzgc8mq5px8e.jpg',
  secure_url:
    'https://res.cloudinary.com/katunold/image/upload/v1573108169/xp7rpmprtzgc8mq5px8e.jpg',
  original_filename: 'IMG_20190907_102217',
};

exports.requestTripResponse = {
  dataValues: {
    id: 1,
    lineManagerId: 'yuwdgvcvxgdhq',
  },
};

exports.allUsers = {
  count: 3,
  rows: [
    {
      id: 'super-admin-user',
      profilePic: null,
      firstName: 'Denis',
      lastName: 'Kasole',
      email: 'kasole@gmail.com',
      gender: 'm',
      birthDate: null,
      residence: null,
      role: 'super_admin',
      department: null,
      lineManagerId: null,
      strategy: 'local',
      verified: true,
    },
    {
      id: '$2b$08$wwsceZ8Sj8jNNZ/GPnTk6uFd2vnzNsUtThDed0xB/ho7i9GmIDAfa',
      profilePic: null,
      firstName: 'Denis',
      lastName: 'Jjagwe',
      email: 'Jjagwe@gmail.com',
      gender: 'm',
      birthDate: null,
      residence: null,
      role: 'manager',
      department: null,
      lineManagerId: 'super-admin-user',
      strategy: 'local',
      verified: true,
    },
    {
      id: '$2b$08$ndSQHn4JMN7Jl1D7otPaDOlO9P5/GJ6xT6FeLCkUGNkktpiOZORlS',
      profilePic: null,
      firstName: 'Arnold',
      lastName: 'Katumba',
      email: 'katunold94@gmail.com',
      gender: 'm',
      birthDate: null,
      residence: null,
      role: 'manager',
      department: null,
      lineManagerId: 'super-admin-user',
      strategy: 'local',
      verified: true,
    },
  ],
};
