import { body } from 'express-validator';

export const notificationValidation = () => [
  body(
    ['isInAppNotification', 'isEmailNotification'],
    'Only booleans accepted as input',
  )
    .optional()
    .isBoolean(),
];
