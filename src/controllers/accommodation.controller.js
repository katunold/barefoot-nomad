import Actions from '../helpers/actions';
import db from '../models';
import { validationResult } from 'express-validator';
import { errorDisplay } from '../middlewares/validations';

export default class AccommodationController {
  static addAccommodationFacility = async (req, res) => {
    const { body, auth } = req;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorDisplay(req, res, errors);
    }
    if (auth.userRole !== 'supplier') {
      return res.status(401).send({
        message: 'You are not authorised to add an accommodation facility ❌',
      });
    }
    const response = await Actions.addData(db.AccommodationFacility, body, [
      'facilityName',
      'locationId',
      'numberOfRooms',
      'available',
    ]);

    return res.status(201).send({
      message: 'Accommodation facility has been added successfully',
      response,
    });
  };
}
