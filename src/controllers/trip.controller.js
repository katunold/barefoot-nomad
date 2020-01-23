import Actions from '../helpers/actions';
import db from '../models';
import { validationResult } from 'express-validator';
import { errorDisplay } from '../middlewares/validations';

export default class TripController {
  static tripBooking = async (req, res) => {
    const { body, auth, params } = req;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
    }
    const currentDate = Date.now();
    const departureDate = Date.parse(body.departureDate);
    const returnDate = Date.parse(body.returnDate);

    if (currentDate >= departureDate && params.tripType === 'one-way') {
      return res.status(422).send({
        message: 'Departure date can only be in the future not the past',
      });
    } else if (
      departureDate >= returnDate &&
      params.tripType === 'return-trip'
    ) {
      return res.status(422).send({
        message: 'Return date cannot be before departure date',
      });
    } else if (
      params.tripType !== 'return-trip' &&
      params.tripType !== 'one-way'
    ) {
      return res.status(404).send({
        message: `${params.tripType} is not a recognized trip route`,
      });
    } else {
      const booking = await Actions.addData(
        db.Trip,
        { ...body, userId: auth.sub, tripType: params.tripType },
        [
          'userId',
          'tripType',
          'departureDate',
          'returnDate',
          'travelReason',
          'accommodationId',
        ],
      );

      return res.status(201).send(booking);
    }
  };
}
