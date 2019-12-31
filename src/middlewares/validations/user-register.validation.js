import { body } from 'express-validator';

export const userRegisterValidation = () => (
  [
    body('firstName', 'First name is required')
      .trim()
      .escape()
      .exists()
      .not()
      .isEmpty(),
    body(
      'firstName',
      'First name should not more than 15 character and not less than 2 characters',
    ).isLength({ min: 2, max: 15 }),
    body(
      'firstName',
      'Only alphabetic characters allowed in the first name',
    ).isAlpha(),
    body('lastName', 'Last name is required')
      .trim()
      .escape()
      .exists()
      .not()
      .isEmpty(),
    body(
      'lastName',
      'Last name should not more than 15 character and not less than 2 characters',
    ).isLength({ min: 2, max: 15 }),
    body(
      'lastName',
      'Only alphabetic characters allowed in the last name',
    ).isAlpha(),
    body('email', 'Provide a valid email')
      .trim()
      .isEmail(),
    body('password', 'Password is required')
      .trim()
      .escape()
      .exists()
      .not()
      .isEmpty(),
  ]
);
