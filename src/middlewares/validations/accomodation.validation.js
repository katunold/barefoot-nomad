import { body } from 'express-validator';

const accommodationValidation = () => [
  body(
    'facilityName',
    'facilityName should not be more than 30 alphabetic characters',
  )
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 30 })
    .matches('^[a-z ]+$', 'i'),
  body(['locationId', 'numberOfRooms'], 'This should be in numeric format')
    .trim()
    .not()
    .isEmpty()
    .isInt(),
  body('available', 'available field takes in only booleans')
    .optional()
    .isBoolean(),
];

export default accommodationValidation;
