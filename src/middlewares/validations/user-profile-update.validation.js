import { body } from 'express-validator';

export const userProfileUpdateValidation = () => (
  [
    body('profilePic', 'Should be in a url format')
      .trim()
      .escape()
      .optional()
      .isURL()
      .not()
      .isEmpty(),
    body(
      ['firstName', 'lastName'],
      'Should be not more than 15 character and not less than 2 characters',
    ).trim().escape().optional().isLength({ min: 2, max: 15 }),
    body(
      ['firstName', 'lastName'],
      'Only alphabetic characters allowed',
    ).trim().escape().optional().isAlpha(),
    body('email', 'Provide a valid email')
      .trim()
      .isEmail()
      .optional(),
    body('gender', 'Can only be m or f')
      .trim()
      .optional()
      .isLength({ min: 1, max: 1 })
      .matches('m|f', 'i'),
    body('birthDate', 'Date should be in this format yyyy-mm-dd')
      .trim()
      .optional()
      .matches('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'),
    body(
      [
        'residence',
        'role',
        'department',
        'lineManager',
        'preferredLanguage',
        'preferredCurrency',
      ],
      'This should not be more than 20 alphabetic characters',
    )
      .trim()
      .optional()
      .matches('^[a-z ]+$', 'i'),
  ]
);
