import { body } from 'express-validator';

export const userLoginValidation = () => [
  body('email', 'Provide a valid email')
    .trim()
    .isEmail(),
  body('password', 'Password is required')
    .trim()
    .escape()
    .exists()
    .not()
    .isEmpty(),
];
