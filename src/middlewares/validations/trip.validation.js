import { body } from 'express-validator';

export const tripValidation = () => [
  body(
    'accommodationId',
    'This should not be more than 30 alphabetic characters',
  )
    .trim()
    .optional()
    .isString(),
  body('travelReason', 'This should not be more than 60 alphabetic characters')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 60 })
    .matches('^[a-z0-9 ]+$', 'i'),
  body('departureDate', 'Date should be in this format YYYY-MM-DDThh:mmTZD')
    .trim()
    .not()
    .isEmpty()
    .matches('\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d?'),
  body('returnDate', 'Date should be in this format YYYY-MM-DDThh:mmTZD')
    .trim()
    .optional()
    .matches('\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d?'),
];
