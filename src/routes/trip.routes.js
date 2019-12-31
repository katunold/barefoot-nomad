import { Router } from 'express';
import Jwt from '../helpers/jwt';
import TripController from '../controllers/trip.controller';
import { tripValidation } from '../middlewares/validations/trip.validation';

const router = Router();

router.post('/one-way', Jwt.requireSignIn, tripValidation(), TripController.tripBooking);

export default router;
