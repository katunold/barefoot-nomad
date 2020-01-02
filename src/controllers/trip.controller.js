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
    const tripDate = Date.parse(body.travelDate);
    if (currentDate >= tripDate) {
      return res.status(422).send({
        message: 'Travel date can only be in the future not the past'
      });
    }
    const booking = await Actions.addData(
      db.Trip,
      { ...body, UserId: auth.sub },
      [
        'UserId',
        'start',
        'stop',
        'travelDate',
        'travelReason',
        'accommodation',
      ],
    );

    return res.status(201).send(booking);
  };
}
