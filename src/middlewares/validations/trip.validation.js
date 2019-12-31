import { body } from 'express-validator';

export const tripValidation = () => (
  [
    body(
      [
        'start',
        'stop'
      ],
      'This should not be more than 20 alphabetic characters',
    )
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 20 })
      .matches('^[a-z ]+$', 'i'),
    body(
      'accommodation',
      'This should not be more than 30 alphabetic characters',
    )
      .trim()
      .optional()
      .isLength({ min: 2, max: 30 })
      .matches('^[a-z ]+$', 'i'),
    body(
      'travelReason',
      'This should not be more than 60 alphabetic characters',
    )
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 60 })
      .matches('^[a-z0-9 ]+$', 'i'),
    body('travelDate', 'Date should be in this format YYYY-MM-DDThh:mmTZD')
      .trim()
      .not()
      .isEmpty()
      .matches('\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d?'),
  ]
);
