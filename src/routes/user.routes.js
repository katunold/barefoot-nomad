import { Router } from 'express';
import RegisterController from '../controllers/register.controller';
import Validations from '../middlewares/validation';

const router = Router();

router.post(
  '/register',
  Validations.validityCheck('register'),
  RegisterController.register,
);
router.get('/verify-email', RegisterController.accountVerification);
router.post(
  '/resend',
  Validations.validityCheck('resend'),
  RegisterController.resendVerificationEmail,
);

export default router;
