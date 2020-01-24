import { Router } from 'express';
import AccommodationController from '../controllers/accommodation.controller';
import Jwt from '../helpers/jwt';
import accommodationValidation from '../middlewares/validations/accomodation.validation';

const router = Router();

router.post(
  '/create',
  Jwt.requireSignIn,
  accommodationValidation(),
  AccommodationController.addAccommodationFacility,
);

export default router;
