import { Router } from 'express';
import Jwt from '../helpers/jwt';
import TripController from '../controllers/trip.controller';
import { tripValidation } from '../middlewares/validations/trip.validation';

const router = Router();

router.post(
  '/:tripType',
  Jwt.requireSignIn,
  tripValidation(),
  TripController.tripBooking,
);

router.get('', Jwt.requireSignIn, TripController.accountTrips);

export default router;
