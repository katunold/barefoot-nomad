import { body } from 'express-validator';

export const userPasswordValidation = (context) => {
  return context === 'new-password'
    ? [
        body('password', 'Password is required')
          .trim()
          .escape()
          .exists()
          .not()
          .isEmpty(),
      ]
    : [
        body('email', 'Provide a valid email')
          .trim()
          .isEmail(),
      ];
};
