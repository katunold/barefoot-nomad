import { Router } from 'express';
import RegisterController from '../controllers/register.controller';
import Validations from '../middlewares/validation';
import LoginController from '../controllers/login.controller';

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
router.post(
  '/login',
  Validations.validityCheck('login'),
  LoginController.login,
);

export default router;
