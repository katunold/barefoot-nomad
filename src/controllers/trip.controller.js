import Actions from '../helpers/actions';
import db from '../models';
import { validationResult } from 'express-validator';
import { errorDisplay } from '../middlewares/validations';

export default class TripController {
  static tripBooking = async (req, res) => {
    const { body, auth } = req;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
    }
    const currentDate = Date.now();
    const departureDate = Date.parse(body.departureDate);
    const returnDate = Date.parse(body.returnDate);
    if (currentDate >= departureDate) {
      return res.status(422).send({
        message: 'Departure date can only be in the future not the past'
      });
    }

    const booking = await Actions.addData(
      db.Trip,
      { ...body, userId: auth.sub },
      [
        'userId',
        'tripType',
        'departureDate',
        'travelReason',
        'accommodationId',
      ],
    );

    return res.status(201).send(booking);
  };
}
